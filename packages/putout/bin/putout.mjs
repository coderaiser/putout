#!/usr/bin/env node

import {
    parentPort,
    workerData,
} from 'node:worker_threads';
import process from 'node:process';
import {
    readFile,
    writeFile,
} from 'node:fs/promises';
import {createTrace} from './trace.mjs';
import cli from '../lib/cli/index.js';

const {stdout} = process;
const write = stdout.write.bind(stdout);
const logError = console.error;

const trace = createTrace(parentPort);

export default await cli({
    write,
    halt: process.exit,
    argv: [
        ...process.argv.slice(2),
        ...(workerData || []).slice(2),
    ],
    log: console.log,
    logError,
    readFile,
    writeFile,
    trace,
});
