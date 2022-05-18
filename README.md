# actjson-config
基于es6代理响应式的json配置文件



## 快速使用

**文件地址**： `./config.json`

```json
{
  "a": 1,
  "b": 2,
  "c": 3
}
```

**文件地址**： `./test.js`

```js
const { ActJson } = require('.');

const json = new ActJson('./config.json');
const config = json.getConfig();
config.a = 2;
config.b = 3;
config.c = 4;

// config.a = 1;
// config.b = 2;
// config.c = 3;

console.log(config);
```

以上例子中，不仅对象上的数据会变，json文件中的内容同样会变

*注意：actjson支持嵌套对象的使用*



## 响应模式

同步模式 ：`new ActJson('./config.json', { sync: true })`

非必要情况下尽量不要使用同步模式

