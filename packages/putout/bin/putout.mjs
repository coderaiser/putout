#!/usr/bin/env node

import {
    readFile,
    writeFile,
} from 'node:fs/promises';
import cli from '../lib/cli/index.js';

const {stdout} = process;
const write = stdout.write.bind(stdout);
const logError = console.error;

await cli({
    write,
    halt: process.exit,
    argv: process.argv.slice(2),
    log: console.log,
    logError,
    readFile,
    writeFile,
});
