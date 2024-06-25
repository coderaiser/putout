#!/usr/bin/env node

import process from 'node:process';
import inspector from 'node:inspector';
import {readFile, writeFile} from 'node:fs/promises';
import {subscribe} from '@putout/engine-reporter/subscribe';
import {createTrace} from './trace.mjs';
import {createIsStop} from './is-stop.mjs';
import {createWrite} from './write.mjs';
import {createCommunication} from './communication.mjs';
import cli from '../lib/cli/index.js';
import {parseArgs} from '../lib/cli/parse-args.js';
import {createExit} from '../lib/cli/exit.mjs';
import {onDebuggerExit} from './debugger-exit.mjs';

const halt = process.exit;
const logError = console.error;
const {log} = console;

onDebuggerExit({
    log,
    process,
    inspector,
});

const {
    worker,
    workerData,
    parentPort,
} = createCommunication();

const trace = createTrace(parentPort);
const isStop = createIsStop(parentPort);
const write = createWrite(parentPort);

const {cwd, stdout} = process;

const args = parseArgs(workerData.slice(2));
const {raw} = args;

if (worker) {
    const exit = createExit({
        raw,
        halt,
        logError,
    });
    
    await subscribe({
        args,
        worker,
        exit,
        cwd,
        write: stdout.write.bind(stdout),
    });
}

workerData.push(...[
    '-f',
    'none',
]);

await cli({
    write,
    halt,
    argv: workerData.slice(2),
    log,
    logError,
    readFile,
    writeFile,
    trace,
    isStop,
});
