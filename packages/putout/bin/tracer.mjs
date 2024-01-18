#!/usr/bin/env node

import process from 'node:process';
import {Worker} from 'node:worker_threads';
import {parseArgs} from '../lib/cli/parse-args.js';
import {subscribe} from './subscribe.mjs';

const {cwd, exit} = process;
const args = parseArgs(process.argv.slice(2));

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
