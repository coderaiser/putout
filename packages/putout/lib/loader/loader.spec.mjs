import {test, stub} from 'supertape';
import {load, transformSource} from './loader.mjs';

test('putout: esm: load', async (t) => {
    const nextLoad = stub().returns({
        source: Buffer.from('const a = 5; module.exports = a;'),
        format: 'module',
    });
    
    const url = 'file://hello.js';
    
    const context = {};
    
    const {source} = await load(url, context, nextLoad);
    const expected = Buffer.from(`'use strict';\n\nmodule.exports = 5;\n`);
    
    t.deepEqual(source, expected);
    t.end();
});

test('putout: loader: transformSource', async (t) => {
    const context = {
        url: `file://hello.js`,
    };
    
    const code = 'const a = 5;';
    const {source} = await transformSource(code, context);
    const expected = Buffer.from(`\n`);
    
    t.deepEqual(source, expected);
    t.end();
});

test('putout: loader: transformSource: ignore: no mock', async (t) => {
    const url = new URL('./fixture/debugger.js', import.meta.url).href;
    const context = {
        url,
    };
    
    const code = 'const a = 5;';
    const {source} = await transformSource(code, context);
    
    t.equal(source, code);
    t.end();
});

test('putout: loader: load: commonjs', async (t) => {
    const url = `file://hello.js`;
    const context = {};
    
    const nextLoad = stub().returns({
        format: 'commonjs',
    });
    
    const result = await load(url, context, nextLoad);
    
    const expected = {
        format: 'commonjs',
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: loader: load: source', async (t) => {
    const url = `file://hello.js`;
    const context = {};
    
    const nextLoad = stub().returns({
        format: 'module',
        source: 'hello',
    });
    
    const result = await load(url, context, nextLoad);
    
    const expected = {
        format: 'module',
        source: Buffer.from(`\n`),
    };
    
    t.deepEqual(result, expected);
    t.end();
});
