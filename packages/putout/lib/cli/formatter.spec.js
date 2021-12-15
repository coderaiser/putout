'use strict';

const test = require('supertape');
const stub = require('@cloudcmd/stub');
const mockRequire = require('mock-require');

const {
    NO_FORMATTER,
    CANNOT_LOAD_FORMATTER,
} = require('./exit-codes');
const {getFormatter} = require('./formatter');

const {reRequire, stopAll} = mockRequire;

const {assign} = Object;

test('putout: cli: formatter: get formatter', async (t) => {
    const exit = stub();
    
    const {default: progress} = await import('@putout/formatter-progress');
    
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
    
    const {default: progress} = await import('@putout/formatter-progress');
    
    const result = await getFormatter(['progress', formatterOptions], exit);
    const expected = [progress, formatterOptions];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: formatter: get reporter', async (t) => {
    const formatter = stub();
    const simport = stub().returns(formatter);
    
    mockRequire('./simple-import', simport);
    
    const {getReporter} = reRequire('./formatter');
    
    const result = await getReporter('xxx', stub());
    
    stopAll();
    reRequire('./formatter');
    
    t.equal(result, formatter);
    t.end();
});

test('putout: cli: formatter: calls', async (t) => {
    const simport = stub()
        .rejects(assign(Error('not found'), {
            code: 'ERR_MODULE_NOT_FOUND',
        }));
    
    mockRequire('./simple-import', simport);
    
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
            const error = assign(Error('not found from test'), {
                code: 'ERR_MODULE_NOT_FOUND',
            });
            
            throw error;
        }
        
        return 'found from test';
    };
    
    mockRequire('./simple-import', simport);
    
    const {getReporter} = reRequire('./formatter');
    
    const exit = stub();
    const result = await getReporter('xxx', exit);
    const expected = 'found from test';
    
    stopAll();
    reRequire('./formatter');
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: formatter: get reporter: exit: NO_FORMATTER', async (t) => {
    const exit = stub();
    const {getReporter} = reRequire('./formatter');
    await getReporter('xxx', exit);
    
    const expected = [
        NO_FORMATTER,
        Error(`Cannot find package 'putout-formatter-xxx'`),
    ];
    
    stopAll();
    reRequire('./formatter');
    
    t.calledWith(exit, expected, 'should call exit');
    t.end();
});

test('putout: cli: formatter: get reporter: exit: CANNOT_LOAD_FORMATTER', async (t) => {
    const exit = stub();
    const simport = stub().rejects(Error('Syntax error'));
    
    mockRequire('./simple-import', simport);
    
    const {getReporter} = reRequire('./formatter');
    await getReporter('xxx', exit);
    
    const expected = [
        CANNOT_LOAD_FORMATTER,
        Error(`@putout/formatter-xxx: Syntax error`),
    ];
    
    stopAll();
    reRequire('./formatter');
    
    t.calledWith(exit, expected, 'should call exit');
    t.end();
});

