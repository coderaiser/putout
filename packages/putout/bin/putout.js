#!/usr/bin/env node

'use strict';

const cli = require('../lib/cli');

const {stdout} = process;
const write = stdout.write.bind(stdout);

module.exports = cli({
    write,
    halt: process.exit,
    argv: process.argv.slice(2),
    log: console.log,
    logError: console.error,
});

