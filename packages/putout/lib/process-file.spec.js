'use strict';

const test = require('supertape');
const mockRequire = require('mock-require');
const stub = require('@cloudcmd/stub');

const {reRequire, stopAll} = mockRequire;

test('putout: process-files: get formatter', (t) => {
    const formatter = stub();
    mockRequire('putout-formatter-xxx', formatter);
    
    const {_getFormatter} = reRequire('./process-file');
    const result = _getFormatter('xxx', stub());
    
    stopAll();
    
    t.equal(result, formatter);
    t.end();
});

test('putout: process-files: get formatter: exit', (t) => {
    const exit = stub();
    
    const {_getFormatter} = reRequire('./process-file');
    _getFormatter('xxx', exit);
    
    t.ok(exit.called);
    t.end();
});

