import {EventEmitter} from 'node:events';
import {test, stub} from 'supertape';
import stripAnsi from 'strip-ansi';
import {onDebuggerExit} from './debugger-exit.mjs';

const {assign} = Object;

test('putout: cli: onDebuggerExit: no inspector', (t) => {
    const log = stub();
    const kill = stub();
    const process = new EventEmitter();
    
    assign(process, {
        pid: 1337,
        kill,
    });
    
    const inspector = {
        url: stub(),
    };
    
    onDebuggerExit({
        log,
        process,
        inspector,
    });
    
    process.emit('exit', 0);
    
    t.notCalled(kill);
    t.end();
});

test('putout: cli: onDebuggerExit: kill', (t) => {
    const log = stub();
    const kill = stub();
    const process = new EventEmitter();
    
    assign(process, {
        pid: 1337,
        kill,
    });
    
    const inspector = {
        close: stub(),
        url: stub().returns('http://<url>'),
    };
    
    onDebuggerExit({
        log,
        process,
        inspector,
    });
    
    process.emit('exit', 1);
    
    t.calledWith(kill, [1337]);
    t.end();
});

test('putout: cli: onDebuggerExit: close', (t) => {
    const log = stub();
    const kill = stub();
    const close = stub();
    const process = new EventEmitter();
    
    assign(process, {
        pid: 1337,
        kill,
    });
    
    const inspector = {
        close,
        url: stub().returns('http://<url>'),
    };
    
    onDebuggerExit({
        log,
        process,
        inspector,
    });
    
    process.emit('exit', 1);
    
    t.calledWithNoArgs(close);
    t.end();
});

test('putout: cli: onDebuggerExit: log', (t) => {
    const log = stub();
    const kill = stub();
    const close = stub();
    const process = new EventEmitter();
    
    assign(process, {
        pid: 1337,
        kill,
    });
    
    const inspector = {
        close,
        url: stub().returns('http://<url>'),
    };
    
    onDebuggerExit({
        log,
        process,
        inspector,
    });
    
    process.emit('exit', 1);
    
    const expected = `node --inspect: 'kill 1337'`;
    
    const [args] = log.args;
    const result = stripAnsi(args[0]);
    
    t.equal(result, expected);
    t.end();
});

test('putout: cli: onDebuggerExit: no inspector: no kill', (t) => {
    const log = stub();
    const kill = stub();
    const close = stub();
    const process = new EventEmitter();
    
    assign(process, {
        pid: 1337,
        kill,
    });
    
    const inspector = {
        close,
        url: stub(),
    };
    
    onDebuggerExit({
        log,
        process,
        inspector,
    });
    
    process.emit('exit', 1);
    
    t.notCalled(kill);
    t.end();
});
