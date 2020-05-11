'use strict';

const {parentPort} = require('worker_threads');
const processFile = require('../process-file');

let index = 0;

parentPort.on('message', async (args) => {
    args[2] = index++;
    const result = await processFile(...args);
    parentPort.postMessage(result);
});
