import process from 'node:process';
import {readFile, writeFile} from 'node:fs/promises';
import {subscribe} from '@putout/engine-reporter/subscribe';
import {createTrace} from './trace.mjs';
import {createIsStop} from './is-stop.mjs';
import {createWrite} from './write.mjs';
import {createCommunication} from './communication.mjs';
import cli from '../lib/cli/index.js';
import {parseArgs} from '../lib/cli/parse-args.js';

const logError = console.error;
const {log} = console;

const {
    worker,
    workerData,
    parentPort,
} = createCommunication();

const trace = createTrace(parentPort);
const isStop = createIsStop(parentPort);
const write = createWrite(parentPort);

const {
    exit,
    cwd,
    stdout,
} = process;

const args = parseArgs(workerData.slice(2));

if (worker)
    subscribe({
        args,
        worker,
        exit,
        cwd,
        write: stdout.write.bind(stdout),
    });

workerData.push(...[
    '-f',
    'none',
]);

await cli({
    write,
    halt: process.exit,
    argv: workerData.slice(2),
    log,
    logError,
    readFile,
    writeFile,
    trace,
    isStop,
});
