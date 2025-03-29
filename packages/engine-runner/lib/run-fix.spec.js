'use strict';

const {test, stub} = require('supertape');
const tryCatch = require('try-catch');
const fix = require('./run-fix');

test('engine-runner: fix: error', (t) => {
    const remove = () => {
        throw Error('hello');
    };
    
    const fn = (a) => a();
    
    const position = {
        line: 10,
        column: 0,
    };
    
    const path = {
        remove,
    };
    
    const is = true;
    
    const [e] = tryCatch(fix, is, fn, {
        path,
        position,
    });
    
    t.equal(e.loc, position);
    t.end();
});

test('fix: error: nested path: debug', (t) => {
    const debugFn = stub();
    
    debugFn.enabled = true;
    
    global.__putout_debug = stub().returns(debugFn);
    
    const remove = () => {
        throw Error('hello');
    };
    
    const fn = (a) => a();
    
    const position = {
        line: 10,
        column: 0,
    };
    
    const path = {
        remove,
    };
    
    const is = true;
    
    const [e] = tryCatch(fix, is, fn, {
        path,
        position,
    });
    
    delete global.__putout_debug;
    
    t.equal(e.loc, position);
    t.end();
});

test('fix: error: nested path: debug: nested path', (t) => {
    const {__putout_debug} = global;
    const debugFn = stub();
    
    debugFn.enabled = true;
    
    global.__putout_debug = stub().returns(debugFn);
    
    const remove = () => {
        throw Error('hello');
    };
    
    const fn = (a) => a();
    
    const position = {
        line: 10,
        column: 0,
    };
    
    const path = {
        path: {
            remove,
        },
    };
    
    const is = true;
    
    const [e] = tryCatch(fix, is, fn, {
        path,
        position,
    });
    
    global.__putout_debug = __putout_debug;
    
    t.equal(e.loc, position);
    t.end();
});

test('fix: is: false', (t) => {
    const remove = () => {
        throw Error('hello');
    };
    
    const fn = stub();
    
    const position = {
        line: 10,
        column: 0,
    };
    
    const path = {
        remove,
    };
    
    const is = false;
    
    fix(is, fn, {
        path,
        position,
    });
    
    t.notCalled(fn, 'should not call fn');
    t.end();
});
