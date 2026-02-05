import process from 'node:process';
import {EventEmitter} from 'node:events';
import {parentPort, workerData} from 'node:worker_threads';

const {assign} = Object;

export const createCommunication = () => {
    if (parentPort)
        return {
            parentPort,
            workerData,
        };
    
    const newWorker = new EventEmitter();
    const newParentPort = new EventEmitter();
    
    assign(newWorker, {
        postMessage: createPostMessage(newParentPort),
    });
    
    assign(newParentPort, {
        postMessage: createPostMessage(newWorker),
    });
    
    return {
        worker: newWorker,
        parentPort: newParentPort,
        workerData: process.argv,
    };
};

export const createPostMessage = (emitter) => (a) => {
    emitter.emit('message', a);
};
