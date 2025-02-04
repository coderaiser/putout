'use strict';

const process = require('node:process');
const {join} = require('node:path');
const tryToCatch = require('try-to-catch');

const {test, stub} = require('supertape');

const mockRequire = require('mock-require');

const {reRequire, stopAll} = mockRequire;

const {assign} = Object;

test('putout: loader: async-loader: none', async (t) => {
    const {createAsyncLoader} = reRequire('./async-loader');
    const loadAsync = createAsyncLoader('formatter');
    
    const result = await loadAsync('none');
    
    t.equal(typeof result, 'function');
    t.end();
});

test('putout: loader: async-loader: calls', async (t) => {
    const simpleImport = stub().rejects(assign(Error('not found'), {
        code: 'ERR_MODULE_NOT_FOUND',
    }));
    
    mockRequire('./simple-import', {
        simpleImport,
    });
    
    const {createAsyncLoader} = reRequire('./async-loader');
    const loadAsync = createAsyncLoader('formatter');
    
    await tryToCatch(loadAsync, 'xxx');
    const expected = [
        ['@putout/formatter-xxx'],
        ['putout-formatter-xxx'],
    ];
    
    stopAll();
    reRequire('./async-loader');
    
    t.deepEqual(simpleImport.args, expected);
    t.end();
});

test('putout: loader: async-loader: rejects', async (t) => {
    const simpleImport = stub().rejects(assign(Error('not found'), {
        code: 'Syntax Error',
    }));
    
    mockRequire('./simple-import', {
        simpleImport,
    });
    
    const {createAsyncLoader} = reRequire('./async-loader');
    const loadAsync = createAsyncLoader('formatter');
    
    const [error] = await tryToCatch(loadAsync, 'xxx');
    const expected = Error('@putout/formatter-xxx: not found');
    
    stopAll();
    reRequire('./async-loader');
    
    t.deepEqual(error, expected);
    t.end();
});

test('putout: loader: async-loader: calls load', async (t) => {
    const load = stub().rejects(Error('LOAD USED'));
    
    const {createAsyncLoader} = reRequire('./async-loader');
    const loadAsync = createAsyncLoader('formatter');
    
    const [error] = await tryToCatch(loadAsync, 'xxx', load);
    
    stopAll();
    reRequire('./async-loader');
    
    t.deepEqual(error, Error('@putout/formatter-xxx: LOAD USED'));
    t.end();
});

test('putout: engine-loader: async-loader: PUTOUT_LOAD_DIR', async (t) => {
    process.env.PUTOUT_LOAD_DIR = join(__dirname, 'fixture');
    
    const {createAsyncLoader} = reRequire('./async-loader');
    const loadAsync = createAsyncLoader('plugin');
    
    const {report} = await loadAsync('hello');
    
    stopAll();
    reRequire('./async-loader');
    
    delete process.env.PUTOUT_LOAD_DIR;
    
    const result = report();
    const expected = 'hello';
    
    t.equal(result, expected);
    t.end();
});
