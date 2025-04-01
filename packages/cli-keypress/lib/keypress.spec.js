import process from 'node:process';
import {Readable} from 'node:stream';
import {test, stub} from 'supertape';
import {keypress, _onKeyPress} from './keypress.js';

const {assign} = Object;

test('putout: cli: on halt: no isTTY', (t) => {
    const {isTTY} = process.stdin;
    
    process.stdin.isTTY = false;
    
    const {isHandlerSet} = keypress();
    
    process.stdin.isTTY = isTTY;
    
    t.notOk(isHandlerSet(), 'should not set handler');
    t.end();
});

test('putout: cli: on halt: isTTY', (t) => {
    const {CI} = process.env;
    
    process.env.CI = true;
    
    const stream = createStream();
    
    const {isHandlerSet} = keypress(stream, {
        isCI: false,
    });
    
    process.env.CI = CI;
    
    t.ok(isHandlerSet(), 'should set handler');
    t.end();
});

test('putout: cli: on halt: isTTY: double call', (t) => {
    const {CI} = process.env;
    
    process.env.CI = true;
    
    const stream = createStream();
    const {isHandlerSet} = keypress(stream, {
        isCI: false,
    });
    
    keypress(stream);
    process.env.CI = CI;
    
    t.ok(isHandlerSet(), 'should set handler');
    t.end();
});

test('putout: cli: on halt: CI, KEYPRESS', (t) => {
    const stream = createStream();
    const {isHandlerSet} = keypress(stream, {
        isCI: true,
        keypress: '1',
    });
    
    keypress(stream);
    
    t.ok(isHandlerSet(), 'should set handler');
    t.end();
});

test('putout: cli: on halt: onKeyPress: Ctrl+C', (t) => {
    const isStop = stub();
    const fn = _onKeyPress(isStop);
    const str = '^c';
    
    const key = {
        ctrl: true,
        name: 'c',
    };
    
    fn(str, key);
    
    t.calledWith(isStop, [true], 'should call isStop');
    t.end();
});

test('putout: cli: on halt: onKeyPress: not Ctrl+C', (t) => {
    const isStop = stub();
    
    const fn = _onKeyPress(isStop);
    
    const str = 'a';
    
    const key = {
        ctrl: false,
        name: 'a',
    };
    
    fn(str, key);
    
    t.notCalled(isStop, 'should not call isStop');
    t.end();
});

function createStream(stream) {
    const read = stub();
    
    const readableStream = new Readable({
        read,
    });
    
    return assign(readableStream, {
        isTTY: true,
        setRawMode: stub(),
        ...stream,
    });
}
