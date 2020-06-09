'use strict';

const test = require('supertape');
const stub = require('@cloudcmd/stub');
const mockRequire = require('mock-require');
const getFormatter = require('./get-formatter');

const {stopAll} = mockRequire;

test('putout: cli: process-file: get formatter', (t) => {
    const formatter = stub();
    mockRequire('putout-formatter-xxx', formatter);
    
    const result = getFormatter('xxx', stub());
    stopAll();
    
    t.equal(result, formatter);
    t.end();
});

test('putout: cli: process-file: get formatter: exit', (t) => {
    const exit = stub();
    
    getFormatter('xxx', exit);
    
    t.ok(exit.called);
    t.end();
});

