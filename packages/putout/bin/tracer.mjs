#!/usr/bin/env node

import process from 'node:process';
import {Worker} from 'node:worker_threads';
import {subscribe} from '@putout/engine-reporter/subscribe';
import {parseArgs} from '../lib/cli/parse-args.js';

const {
    cwd,
    exit,
    stdout,
} = process;

const args = parseArgs(process.argv.slice(2));
const write = stdout.write.bind(stdout);

if (!args.worker) {
    await import('./putout.mjs');
    exit();
}

const slave = new URL('./putout.mjs', import.meta.url);
const worker = new Worker(slave, {
    workerData: dropInteractive(process.argv),
    stdin: true,
});

subscribe({
    args,
    worker,
    exit,
    cwd,
    write,
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
