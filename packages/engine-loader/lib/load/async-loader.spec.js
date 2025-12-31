import process from 'node:process';
import {tryToCatch} from 'try-to-catch';
import {test, stub} from 'supertape';
import {createAsyncLoader} from './async-loader.js';

const {assign} = Object;

test('putout: loader: async-loader: none', async (t) => {
    const loadAsync = createAsyncLoader('formatter');
    const result = await loadAsync('none');
    
    t.equal(typeof result, 'function');
    t.end();
});

test('putout: loader: async-loader: calls', async (t) => {
    const simpleImport = stub().rejects(assign(Error('not found'), {
        code: 'ERR_MODULE_NOT_FOUND',
    }));
    
    const loadAsync = createAsyncLoader('formatter', {
        simpleImport,
    });
    
    await tryToCatch(loadAsync, 'xxx');
    const expected = [
        ['@putout/formatter-xxx'],
        ['putout-formatter-xxx'],
    ];
    
    t.deepEqual(simpleImport.args, expected);
    t.end();
});

test('putout: loader: async-loader: rejects', async (t) => {
    const simpleImport = stub().rejects(assign(Error('not found'), {
        code: 'Syntax Error',
    }));
    
    const loadAsync = createAsyncLoader('formatter', {
        simpleImport,
    });
    
    const [error] = await tryToCatch(loadAsync, 'xxx');
    const expected = Error('@putout/formatter-xxx: not found');
    
    t.deepEqual(error, expected);
    t.end();
});

test('putout: loader: async-loader: calls load', async (t) => {
    const simpleImport = stub().rejects(Error('LOAD USED'));
    const loadAsync = createAsyncLoader('formatter', {
        simpleImport,
    });
    
    const [error] = await tryToCatch(loadAsync, 'xxx');
    
    t.deepEqual(error, Error('@putout/formatter-xxx: LOAD USED'));
    t.end();
});

test('putout: engine-loader: async-loader: PUTOUT_LOAD_DIR', async (t) => {
    process.env.PUTOUT_LOAD_DIR = new URL('fixture', import.meta.url).pathname;
    
    const loadAsync = createAsyncLoader('plugin');
    const {report} = await loadAsync('hello');
    
    delete process.env.PUTOUT_LOAD_DIR;
    
    const result = report();
    const expected = 'hello';
    
    t.equal(result, expected);
    t.end();
});

test('putout: engine-loader: async-loader: PUTOUT_LOAD_DIR: node_modules', async (t) => {
    process.env.PUTOUT_LOAD_DIR = new URL('fixture', import.meta.url).pathname;
    
    const loadAsync = createAsyncLoader('plugin');
    
    const {report} = await loadAsync('world');
    
    delete process.env.PUTOUT_LOAD_DIR;
    
    const result = report();
    const expected = 'hello';
    
    t.equal(result, expected);
    t.end();
});
