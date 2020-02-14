#!/usr/bin/env node

'use strict';

const cli = require('../lib/cli');

cli({
    halt: process.exit,
    argv: process.argv.slice(2),
    log: console.log,
    logError: console.error,
});

