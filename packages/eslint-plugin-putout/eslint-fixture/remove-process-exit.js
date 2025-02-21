'use strict';

const {fileURLToPath} = require('node:url');
const {dirname} = require('node:path');
const {createRequire} = require('node:module');
const process = require('node:process');
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

process.exit();
