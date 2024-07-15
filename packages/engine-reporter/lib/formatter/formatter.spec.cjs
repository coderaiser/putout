'use strict';

const {test, stub} = require('supertape');
const mockRequire = require('mock-require');

const {
    NO_FORMATTER,
    CANNOT_LOAD_FORMATTER,
} = require('putout/exit-codes/cjs');

const {getFormatter} = require('./formatter.cjs');
const {reRequire, stopAll} = mockRequire;

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

test('putout: cli: formatter: get reporter: exit: NO_FORMATTER', async (t) => {
    const exit = stub();
    const {getFormatter} = reRequire('./formatter.cjs');
    
    await getFormatter('xxx', exit);
    
    const expected = [NO_FORMATTER, Error(`Cannot find package 'putout-formatter-xxx'`)];
    
    stopAll();
    reRequire('./formatter.cjs');
    
    t.calledWith(exit, expected, 'should call exit');
    t.end();
});

test('putout: cli: formatter: get reporter: exit: CANNOT_LOAD_FORMATTER', async (t) => {
    const exit = stub();
    const createAsyncLoader = stub().returns(stub().rejects(Error('@putout/formatter-xxx: Syntax error')));
    
    mockRequire('@putout/engine-loader', {
        createAsyncLoader,
    });
    
    const {getFormatter} = reRequire('./formatter.cjs');
    await getFormatter('xxx', exit);
    
    const expected = [CANNOT_LOAD_FORMATTER, Error(`@putout/formatter-xxx: Syntax error`)];
    
    stopAll();
    reRequire('./formatter.cjs');
    
    t.calledWith(exit, expected, 'should call exit');
    t.end();
});

test('putout: cli: formatter: get reporter: pass load', async (t) => {
    const exit = stub();
    const simpleImport = stub().rejects(Error('simple import'));
    
    mockRequire('putout/simple-import', {
        simpleImport,
    });
    
    const {getFormatter} = reRequire('./formatter.cjs');
    await getFormatter('xxx', exit);
    
    const expected = [CANNOT_LOAD_FORMATTER, Error(`@putout/formatter-xxx: simple import`)];
    
    stopAll();
    reRequire('./formatter.cjs');
    
    t.calledWith(exit, expected, 'should call exit');
    t.end();
});
