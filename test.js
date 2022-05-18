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
