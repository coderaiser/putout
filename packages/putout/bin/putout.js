#!/usr/bin/env node

import process from 'node:process';
import inspector from 'node:inspector';
import {readFile, writeFile} from 'node:fs/promises';
import {subscribe} from '@putout/engine-reporter/subscribe';
import {createTrace} from './trace.js';
import {createIsStop} from './is-stop.js';
import {createWrite} from './write.js';
import {createCommunication} from './communication.js';
import cli from '../lib/cli/index.js';
import {parseArgs} from '../lib/cli/parse-args.js';
import {createExit} from '../lib/cli/exit.js';
import {onDebuggerExit} from './debugger-exit.js';
import {dropInteractive} from './drop-interactive.js';

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
    argv: dropInteractive(workerData.slice(2)),
    log,
    logError,
    readFile,
    writeFile,
    trace,
    isStop,
});
