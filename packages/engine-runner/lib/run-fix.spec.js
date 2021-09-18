'use strict';

const test = require('supertape');
const stub = require('@cloudcmd/stub');
const tryCatch = require('try-catch');

const fix = require('./run-fix');

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

