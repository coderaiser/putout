#!/usr/bin/env node

import process from 'node:process';
import {Worker} from 'node:worker_threads';
import keyPress from '@putout/cli-keypress';
import {parseArgs} from '../lib/cli/parse-args.js';
import {createReport} from './report.mjs';

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

const {isStop} = keyPress();

const report = await createReport({
    args,
    cwd,
    exit,
});

worker.on('message', async ([event, data]) => {
    if (event !== 'progress')
        return;
    
    if (isStop())
        data.index = data.count - 1;
    
    process.stdout.write(await report(data));
    
    if (isStop())
        worker.postMessage(['stop']);
});

worker.on('exit', (code) => {
    exit(code);
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
