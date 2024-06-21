#!/usr/bin/env node

import {Worker} from 'node:worker_threads';
import process, {
    cwd,
    stdout,
    exit as halt,
} from 'node:process';
import {subscribe} from '@putout/engine-reporter/subscribe';
import {parseArgs} from '../lib/cli/parse-args.js';
import {createExit} from '../lib/cli/exit.mjs';

const args = parseArgs(process.argv.slice(2));
const write = stdout.write.bind(stdout);

if (!args.worker) {
    await import('./putout.mjs');
    halt();
}

const slave = new URL('./putout.mjs', import.meta.url);

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

function dropInteractive(argv) {
    const result = [];
    
    for (const arg of argv) {
        if (arg === '-i' || arg === '--interactive')
            continue;
        
        result.push(arg);
    }
    
    return result;
}
