import {EventEmitter} from 'node:events';
import {setTimeout} from 'node:timers/promises';
import {test, stub} from 'supertape';
import {subscribe} from './subscribe.js';

const {assign} = Object;

test('putout: engine-reporter: subscribe: keypress', async (t) => {
    const worker = new EventEmitter();
    const isStop = stub();
    const keypress = stub().returns({
        isStop,
    });
    
    const report = stub();
    const createReport = stub().returns(report);
    const write = stub();
    
    const args = [];
    const cwd = '/';
    const exit = stub();
    
    await subscribe({
        write,
        cwd,
        args,
        worker,
        exit,
        createReport,
        keypress,
    });
    
    t.calledWithNoArgs(keypress);
    t.end();
});

test('putout: engine-reporter: subscribe: createReport', async (t) => {
    const worker = new EventEmitter();
    const isStop = stub();
    const keypress = stub().returns({
        isStop,
    });
    
    const report = stub();
    const createReport = stub().returns(report);
    const write = stub();
    
    const args = [];
    const cwd = '/';
    const exit = stub();
    
    await subscribe({
        write,
        cwd,
        args,
        worker,
        exit,
        createReport,
        keypress,
    });
    
    const expected = {
        args,
        cwd,
        exit,
    };
    
    t.calledWith(createReport, [expected]);
    t.end();
});

test('putout: engine-reporter: subscribe: worker: message: progress', async (t) => {
    const worker = new EventEmitter();
    const isStop = stub();
    const keypress = stub().returns({
        isStop,
    });
    
    const report = stub();
    const createReport = stub().returns(report);
    const write = stub();
    
    const args = [];
    const cwd = '/';
    const exit = stub();
    
    await subscribe({
        write,
        cwd,
        args,
        worker,
        exit,
        createReport,
        keypress,
    });
    
    const data = 'hello';
    
    worker.emit('message', ['progress', data]);
    
    t.calledWith(report, [data]);
    t.end();
});

test('putout: engine-reporter: subscribe: worker: message: progress: write', async (t) => {
    const worker = new EventEmitter();
    const isStop = stub();
    const keypress = stub().returns({
        isStop,
    });
    
    const report = stub();
    const createReport = stub().returns(report);
    const write = stub();
    
    const args = [];
    const cwd = '/';
    const exit = stub();
    
    write.hello = 'ss';
    
    await subscribe({
        write,
        cwd,
        args,
        worker,
        exit,
        createReport,
        keypress,
    });
    
    worker.emit('message', ['progress', 'hello']);
    
    await setTimeout(1);
    
    t.calledWith(write, ['']);
    t.end();
});

test('putout: engine-reporter: subscribe: worker: message: progress: write: line', async (t) => {
    const worker = new EventEmitter();
    const isStop = stub();
    const keypress = stub().returns({
        isStop,
    });
    
    const report = stub().returns('world');
    const createReport = stub().returns(report);
    const write = stub();
    
    const args = [];
    const cwd = '/';
    const exit = stub();
    
    await subscribe({
        write,
        cwd,
        args,
        worker,
        exit,
        createReport,
        keypress,
    });
    
    worker.emit('message', ['progress', 'hello']);
    
    await setTimeout(1);
    
    t.calledWith(write, ['world']);
    t.end();
});

test('putout: engine-reporter: subscribe: worker: message', async (t) => {
    const worker = new EventEmitter();
    const isStop = stub();
    const keypress = stub().returns({
        isStop,
    });
    
    const report = stub();
    const createReport = stub().returns(report);
    const write = stub();
    
    const args = [];
    const cwd = '/';
    const exit = stub();
    
    await subscribe({
        write,
        cwd,
        args,
        worker,
        exit,
        createReport,
        keypress,
    });
    
    const data = 'hello';
    
    worker.emit('message', ['start', data]);
    
    t.notCalled(report);
    t.end();
});

test('putout: engine-reporter: subscribe: worker: message: progress: isStop', async (t) => {
    const postMessage = stub();
    const worker = new EventEmitter();
    
    assign(worker, {
        postMessage,
    });
    const isStop = stub().returns(true);
    
    const keypress = stub().returns({
        isStop,
    });
    
    const report = stub().returns('world');
    const createReport = stub().returns(report);
    const write = stub();
    
    const args = [];
    const cwd = '/';
    const exit = stub();
    
    await subscribe({
        write,
        cwd,
        args,
        worker,
        exit,
        createReport,
        keypress,
    });
    
    worker.emit('message', ['progress', 'hello']);
    await setTimeout(1);
    
    const expected = ['stop'];
    
    t.calledWith(postMessage, [expected]);
    t.end();
});
