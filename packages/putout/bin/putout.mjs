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
import {createIsStop} from './is-stop.mjs';
import {createWrite} from './write.mjs';
import cli from '../lib/cli/index.js';

const logError = console.error;

const trace = createTrace(parentPort);
const isStop = createIsStop(parentPort);
const write = createWrite(parentPort);

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
    isStop,
});
