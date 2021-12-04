'use strict';

const test = require('supertape');
const stub = require('@cloudcmd/stub');
const mockRequire = require('mock-require');
const progress = require('@putout/formatter-progress');

const {
    getFormatter,
    getReporter,
} = require('./formatter');

const {reRequire, stopAll} = mockRequire;

test('putout: cli: formatter: get formatter', async (t) => {
    const exit = stub();
    
    const result = await getFormatter('progress', exit);
    const expected = [progress, {}];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: formatter: get formatter: options', async (t) => {
    const exit = stub();
    
    const formatterOptions = {
        minCount: 10,
    };
    
    const result = await getFormatter(['progress', formatterOptions], exit);
    const expected = [progress, formatterOptions];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: formatter: get reporter', async (t) => {
    const formatter = stub();
    const simport = stub().returns(formatter);
    
    mockRequire('simport', {
        createSimport: stub().returns(simport),
    });
    
    const {getReporter} = reRequire('./formatter');
    
    const result = await getReporter('xxx', stub());
    
    stopAll();
    reRequire('./formatter');
    
    t.equal(result, formatter);
    t.end();
});

test('putout: cli: formatter: calls', async (t) => {
    const simport = stub().rejects(Error('not found'));
    
    mockRequire('simport', {
        createSimport: stub().returns(simport),
    });
    
    const {getReporter} = reRequire('./formatter');
    
    const exit = stub();
    await getReporter('xxx', exit);
    const expected = [
        ['@putout/formatter-xxx'],
        ['putout-formatter-xxx'],
    ];
    
    stopAll();
    reRequire('./formatter');
    
    t.deepEqual(simport.args, expected);
    t.end();
});

test('putout: cli: formatter: second import', async (t) => {
    let called = false;
    
    const simport = async () => {
        if (!called) {
            called = true;
            throw Error('not found from test');
        }
        
        return 'found from test';
    };
    
    mockRequire('simport', {
        createSimport: stub().returns(simport),
    });
    
    const {getReporter} = reRequire('./formatter');
    
    const exit = stub();
    const result = await getReporter('xxx', exit);
    const expected = 'found from test';
    
    stopAll();
    reRequire('./formatter');
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: formatter: get reporter: exit', async (t) => {
    const exit = stub();
    
    await getReporter('xxx', exit);
    
    t.ok(exit.called);
    t.end();
});

