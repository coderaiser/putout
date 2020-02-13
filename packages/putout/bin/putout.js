#!/usr/bin/env node

'use strict';

const cli = require('../lib/cli');

cli({
    halt: process.exit,
    argv: process.argv.slice(2),
    write: console.log,
    writeError: console.error,
});

