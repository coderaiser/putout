const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
const DIR = __dirname + '/';

const {
    createConfig,
} = require(DIR + 'config');

export const configPath = require(DIR + 'config');

export const createConfigManager = createConfig;
