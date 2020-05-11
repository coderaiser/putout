'use strict';

const {AsyncResource} = require('async_hooks');
const {EventEmitter} = require('events');
const path = require('path');
const {Worker} = require('worker_threads');
const {cpus} = require('os');

const kTaskInfo = Symbol('kTaskInfo');
const kWorkerFreedEvent = Symbol('kWorkerFreedEvent');

const {THREAD_IT_COUNT} = process.env;
const numThreads = isNaN(THREAD_IT_COUNT) ? cpus().length : Number(THREAD_IT_COUNT);

class WorkerPoolTaskInfo extends AsyncResource {
    constructor(callback) {
        super('WorkerPoolTaskInfo');
        this.callback = callback;
    }
    
    done(err, result) {
        this.runInAsyncScope(this.callback, null, err, result);
        this.emitDestroy(); // `TaskInfo`s are used only once.
    }
}
module.exports = class ThreadIt extends EventEmitter {
    constructor(name) {
        super();
        this.workers = [];
        this.freeWorkers = [];
        this.name = name;
        
        this.setMaxListeners(Infinity);
        
        for (let i = 0; i < numThreads; i++)
            this.addNewWorker();
    }
    
    addNewWorker() {
        const worker = new Worker(path.resolve(__dirname, this.name));
        
        worker.on('message', (result) => {
            // In case of success: Call the callback that was passed to `runTask`,
            // remove the `TaskInfo` associated with the Worker, and mark it as free
            // again.
            worker[kTaskInfo].done(null, result);
            worker[kTaskInfo] = null;
            this.freeWorkers.push(worker);
            this.emit(kWorkerFreedEvent);
        });
        worker.on('error', (err) => {
            // In case of an uncaught exception: Call the callback that was passed to
            // `runTask` with the error.
            if (worker[kTaskInfo])
                worker[kTaskInfo].done(err, null);
            else
                this.emit('error', err);
            // Remove the worker from the list and start a new Worker to replace the
            // current one.
            this.workers.splice(this.workers.indexOf(worker), 1);
            this.addNewWorker();
        });
        this.workers.push(worker);
        this.freeWorkers.push(worker);
        this.emit(kWorkerFreedEvent);
    }
    
    runTask(task, callback) {
        if (this.freeWorkers.length === 0) {
            // No free threads, wait until a worker thread becomes free.
            this.once(kWorkerFreedEvent, () => this.runTask(task, callback));
            return;
        }
        
        const {
            name,
            options,
            length,
            source,
        } = task;
        
        const worker = this.freeWorkers.pop();
        worker[kTaskInfo] = new WorkerPoolTaskInfo(callback);
        worker.postMessage([
            options,
            name,
            0,
            {length},
            source,
        ]);
    }
    
    close() {
        for (const worker of this.workers)
            worker.terminate();
    }
};

