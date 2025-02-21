'use strict';

const {fileURLToPath} = require('node:url');
const {dirname} = require('node:path');
const {createRequire} = require('node:module');
const exitCodes = require('putout/exit-codes');
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(exitCodes);
