'use strict';

const fullstore = require('fullstore');
const {promisify} = require('util');

const {
    Worker,
    isMainThread,
    parentPort,
    workerData,
} = require('worker_threads');

if (isMainThread) {
    module.exports = promisify((names, options, fn) => {
        const workers = [];
        const indexStore = fullstore(-1);
        const {length} = names;
        
        let j = 0;
        const places = [];
        for (let i = 1; i < 3; i++) {
            const name = names.shift();
            const index = indexStore(indexStore() + 1);
            
            if (!name)
                return;
            
            const worker = getWorker(length, options);
            workers.push(worker);
            wrap({names, worker, places, indexStore}, () => {
                ++j;
                
                if (j === i - 1)
                    fn(null, places.filter(Boolean));
            });
            
            worker.postMessage({
                name,
                index,
                length,
            });
        }
    });
} else {
    const processFile = require('./process-file');
    const {length} = workerData;
    
    parentPort.on('message', ({name, index}) => {
        const places = processFile(workerData)(name, index, {
            length,
        });
        
        parentPort.postMessage(places);
    });
}

function getWorker(length, options) {
    return new Worker(__filename, {
        workerData: {
            length,
            options,
        }
    });
}

function wrap({names, places, worker, indexStore}, done) {
    worker.on('message', (a) => {
        places.push(...a || []);
        
        if (!names.length) {
            worker.terminate();
            done();
        }
        
        indexStore(indexStore() + 1);
        
        worker.postMessage({
            name: names.shift(),
            index: indexStore(),
        });
    });
}

