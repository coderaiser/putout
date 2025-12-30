#!/usr/bin/env node

import {Worker} from 'node:worker_threads';
import process, {
    cwd,
    stdout,
    exit as halt,
} from 'node:process';
import {subscribe} from '@putout/engine-reporter/subscribe';
import {parseArgs} from '../lib/cli/parse-args.js';
import {createExit} from '../lib/cli/exit.js';
import {dropInteractive} from './drop-interactive.js';

const args = parseArgs(process.argv.slice(2));
const write = stdout.write.bind(stdout);

if (!args.worker) {
    await import('./putout.js');
    halt();
}

const slave = new URL('./putout.js', import.meta.url);

const worker = new Worker(slave, {
    workerData: dropInteractive(process.argv),
    stdin: true,
});

await subscribe({
    args,
    worker,
    cwd,
    write,
    exit: createExit({
        halt,
        logError: console.error,
    }),
});
