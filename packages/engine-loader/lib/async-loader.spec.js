'use strict';

const tryToCatch = require('try-to-catch');

const test = require('supertape');
const stub = require('@cloudcmd/stub');
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
    const simpleImportDefault = stub()
        .rejects(assign(Error('not found'), {
            code: 'ERR_MODULE_NOT_FOUND',
        }));
    
    mockRequire('./simple-import', {
        simpleImportDefault,
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
    
    t.deepEqual(simpleImportDefault.args, expected);
    t.end();
});

test('putout: loader: async-loader: rejects', async (t) => {
    const simpleImportDefault = stub()
        .rejects(assign(Error('not found'), {
            code: 'Syntax Error',
        }));
    
    mockRequire('./simple-import', {
        simpleImportDefault,
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
