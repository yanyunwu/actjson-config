const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);

class ActJson {
  constructor(filePath, conf = {}) {
    this.conf = { sync: false, ...conf };
    let fpath;
    if (path.isAbsolute(filePath)) fpath = filePath;
    else fpath = path.resolve(process.cwd(), filePath);
    this.filePath = fpath;
    this.initFile();
    this.target = require(this.filePath);
    this._getReceiver();
    this.whiteChange = false;
  }

  initFile() {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, "{}");
    }
  }

  _getReceiver() {
    let that = this;
    /** 支持嵌套对象的代理 */
    let handler = {
      get(target, prop, _receiver) {
        if (typeof target[prop] === 'object') {
          return new Proxy(target[prop], handler);
        } else {
          return target[prop];
        }
      },
      set(target, prop, value, receiver) {
        if (target[prop] !== value) {
          target[prop] = value;
          if (that.conf.sync) fs.writeFileSync(that.filePath, JSON.stringify(that.receiver))
          else {
            if (!that.whiteChange) {
              that.whiteChange = true;
              setTimeout(() => {
                writeFile(that.filePath, JSON.stringify(that.receiver)).then(value => {
                  that.whiteChange = false;
                }).catch(err => {
                  console.log(err);
                })
              })
            }
          }
        }
      }
    }
    this.receiver = new Proxy(this.target, handler);
  }

  getConfig() {
    return this.receiver;
  }

  set(_prop, _value) {

  }

}

module.exports = {
  ActJson
};