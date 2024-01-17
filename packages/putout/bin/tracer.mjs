#!/usr/bin/env node

import {Worker} from 'node:worker_threads';
import keyPress from '@putout/cli-keypress';
import progressBar from '@putout/formatter-progress-bar';
import process from 'node:process';

const slave = new URL('./putout.mjs', import.meta.url);

const worker = new Worker(slave, {
    workerData: process.argv,
    stdin: true,
});

const {isStop} = keyPress();

worker.on('message', ([event, data]) => {
    let end = false;
    
    if (event !== 'progress')
        return;
    
    if (isStop())
        data.index = data.count - 1;
    
    if (data.index === data.count - 1)
        end = true;
    
    process.stdout.write(progressBar(data));
    
    if (end)
        process.exit();
});
