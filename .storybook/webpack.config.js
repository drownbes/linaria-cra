const transformBabelLoader = require('../transformBabelLoader');

module.exports = async ({ config }) => {
  let loader = config.module.rules[config.module.rules.length - 1];
  config.module.rules[config.module.rules.length - 1] = transformBabelLoader(loader);
  return config;
}
