const DIR = __dirname + '/';

const {
    createConfig,
} = require(DIR + 'config');

const configPath = require(DIR + 'config');

module.exports.configPath = configPath;
module.exports.createConfigManager = createConfig;
