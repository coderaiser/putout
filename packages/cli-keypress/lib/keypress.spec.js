'use strict';

const {Readable} = require('stream');
const {test, stub} = require('supertape');
const mockRequire = require('mock-require');

const {
    reRequire,
    stopAll,
} = mockRequire;

const {assign} = Object;

test('putout: cli: on halt: no isTTY', (t) => {
    const {isTTY} = process.stdin;
    process.stdin.isTTY = false;
    
    const onHalt = reRequire('./keypress');
    const {isHandlerSet} = onHalt();
    
    process.stdin.isTTY = isTTY;
    
    t.notOk(isHandlerSet(), 'should not set handler');
    t.end();
});

test('putout: cli: on halt: isTTY', (t) => {
    const {CI} = process.env;
    process.env.CI = true;
    
    mockRequire('ci-info', {
        isCI: false,
    });
    
    const onHalt = reRequire('./keypress');
    
    const stream = createStream();
    const {isHandlerSet} = onHalt(stream);
    
    process.env.CI = CI;
    
    stopAll();
    
    t.ok(isHandlerSet(), 'should set handler');
    t.end();
});

test('putout: cli: on halt: isTTY: duble call', (t) => {
    const {CI} = process.env;
    process.env.CI = true;
    
    mockRequire('ci-info', {
        isCI: false,
    });
    
    const onHalt = reRequire('./keypress');
    
    const stream = createStream();
    const {isHandlerSet} = onHalt(stream);
    
    onHalt(stream);
    process.env.CI = CI;
    
    stopAll();
    
    t.ok(isHandlerSet(), 'should set handler');
    t.end();
});

test('putout: cli: on halt: CI, KEYPRESS', (t) => {
    const {KEYPRESS} = process.env;
    
    process.env.KEYPRESS = '1';
    
    mockRequire('ci-info', {
        isCI: true,
    });
    
    const onHalt = reRequire('./keypress');
    const stream = createStream();
    const {isHandlerSet} = onHalt(stream);
    
    onHalt(stream);
    process.env.KEYPRESS = KEYPRESS;
    
    stopAll();
    
    t.ok(isHandlerSet(), 'should set handler');
    t.end();
});

test('putout: cli: on halt: onKeyPress: Ctrl+C', (t) => {
    const {_onKeyPress} = reRequire('./keypress');
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
    const {_onKeyPress} = reRequire('./keypress');
    const isStop = stub();
    
    const fn = _onKeyPress(isStop);
    
    const str = 'a';
    const key = {
        ctrl: false,
        name: 'a',
    };
    
    fn(str, key);
    
    t.notOk(isStop.called, 'should not call isStop');
    t.end();
});

function createStream(stream) {
    const read = stub();
    
    return assign(new Readable({read}), {
        isTTY: true,
        setRawMode: stub(),
        ...stream,
    });
}

