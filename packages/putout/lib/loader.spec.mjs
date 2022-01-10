import {
    test,
    stub,
} from 'supertape';
import {
    load,
    transformSource,
} from './loader.mjs';

test('putout: loader: transformSource', (t) => {
    const context = {
        url: `file://hello.js`,
    };
    
    const code = 'const a = 5;';
    const {source} = transformSource(code, context);
    const expected = `'use strict';`;
    
    t.equal(source, expected);
    t.end();
});

test('putout: loader: transformSource: ignore: no mock', (t) => {
    const url = new URL('../test/fixture/debugger.js', import.meta.url).href;
    const context = {
        url,
    };
    
    const code = 'const a = 5;';
    const {source} = transformSource(code, context);
    
    t.equal(source, code);
    t.end();
});

test('putout: loader: load: no source', async (t) => {
    const url = `file://hello.js`;
    const context = {};
    const defaultLoad = stub().returns({
        source: '',
    });
    
    const result = await load(url, context, defaultLoad);
    const expected = {
        format: 'commonjs',
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: loader: load: source', async (t) => {
    const url = `file://hello.js`;
    const context = {};
    const defaultLoad = stub().returns({
        source: 'hello',
    });
    
    const result = await load(url, context, defaultLoad);
    const expected = {
        format: 'module',
        source: `'use strict';`,
    };
    
    t.deepEqual(result, expected);
    t.end();
});
