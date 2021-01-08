#!/usr/bin/env node

'use strict';

require('v8-compile-cache');

const {
    readFile,
    writeFile,
} = require('fs/promises');

const cli = require('../lib/cli');

const {stdout} = process;
const write = stdout.write.bind(stdout);
const logError = console.error;

module.exports = cli({
    write,
    halt: process.exit,
    argv: process.argv.slice(2),
    log: console.log,
    logError,
    readFile,
    writeFile,
});

