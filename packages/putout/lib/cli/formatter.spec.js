'use strict';

const test = require('supertape');
const stub = require('@cloudcmd/stub');
const mockRequire = require('mock-require');
const progress = require('@putout/formatter-progress');

const {
    getFormatter,
    getReporter,
} = require('./formatter');

const {stopAll} = mockRequire;

test('putout: cli: formatter: get formatter', (t) => {
    const exit = stub();
    
    const result = getFormatter('progress', exit);
    const expected = [progress, {}];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: formatter: get formatter: options', (t) => {
    const exit = stub();
    
    const formatterOptions = {
        minCount: 10,
    };
    
    const result = getFormatter(['progress', formatterOptions], exit);
    const expected = [progress, formatterOptions];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: formatter: get reporter', (t) => {
    const formatter = stub();
    mockRequire('putout-formatter-xxx', formatter);
    
    const result = getReporter('xxx', stub());
    stopAll();
    
    t.equal(result, formatter);
    t.end();
});

test('putout: cli: formatter: get reporter: exit', (t) => {
    const exit = stub();
    
    getReporter('xxx', exit);
    
    t.ok(exit.called);
    t.end();
});

