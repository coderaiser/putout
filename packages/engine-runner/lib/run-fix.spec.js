'use strict';

const mockRequire = require('mock-require');

const {
    test,
    stub,
} = require('supertape');

const tryCatch = require('try-catch');
const fix = require('./run-fix');

const {
    stopAll,
    reRequire,
} = mockRequire;

test('fix: error', (t) => {
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
    const [e] = tryCatch(fix, is, fn, {path, position});
    
    t.equal(e.loc, position);
    t.end();
});

test('fix: error: nested path: debug', (t) => {
    const debugFn = stub();
    debugFn.enabled = true;
    const debug = stub().returns(debugFn);
    
    mockRequire('debug', debug);
    
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
    const fix = reRequire('./run-fix');
    const [e] = tryCatch(fix, is, fn, {path, position});
    
    stopAll();
    
    t.equal(e.loc, position);
    t.end();
});

test('fix: error: nested path: debug: nested path', (t) => {
    const debugFn = stub();
    debugFn.enabled = true;
    const debug = stub().returns(debugFn);
    
    mockRequire('debug', debug);
    
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
    const fix = reRequire('./run-fix');
    const [e] = tryCatch(fix, is, fn, {path, position});
    
    stopAll();
    
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
    fix(is, fn, {path, position});
    
    t.notOk(fn.called, 'should not call fn');
    t.end();
});

