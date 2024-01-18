#!/usr/bin/env node

import process from 'node:process';
import {Worker} from 'node:worker_threads';
import keyPress from '@putout/cli-keypress';
import progressBar from '@putout/formatter-progress-bar';

const slave = new URL('./putout.mjs', import.meta.url);

const worker = new Worker(slave, {
    workerData: process.argv,
    stdin: true,
});

const {isStop} = keyPress();

worker.on('message', ([event, data]) => {
    if (event !== 'progress')
        return;
    
    if (isStop())
        data.index = data.count - 1;
    
    process.stdout.write(progressBar(data));
    
    if (isStop())
        worker.postMessage(['stop']);
});

worker.on('exit', (code) => {
    process.exit(code);
});
