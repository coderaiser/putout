#!/usr/bin/env node

import process from 'node:process';
import {
    readFile,
    writeFile,
} from 'node:fs/promises';
import {createTrace} from './trace.mjs';
import {createIsStop} from './is-stop.mjs';
import {createWrite} from './write.mjs';
import cli from '../lib/cli/index.js';
import {parseArgs} from '../lib/cli/parse-args.js';
import {createCommunication} from './communication.mjs';
import {subscribe} from './subscribe.mjs';

const logError = console.error;
const {
    worker,
    workerData,
    parentPort,
} = createCommunication();

const trace = createTrace(parentPort);
const isStop = createIsStop(parentPort);
const write = createWrite(parentPort);

const {exit, cwd} = process;

const args = parseArgs(workerData.slice(2));

if (worker)
    subscribe({
        args,
        worker,
        exit,
        cwd,
    });

workerData.push(...[
    '-f',
    'none',
]);

await cli({
    write,
    halt: process.exit,
    argv: workerData.slice(2),
    log: console.log,
    logError,
    readFile,
    writeFile,
    trace,
    isStop,
});
