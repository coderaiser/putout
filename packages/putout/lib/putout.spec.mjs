import test from 'supertape';
import {stub} from 'supertape';
import putout, {
    load,
} from './putout.mjs';

test('putout: esm: load', async (t) => {
    const defaultLoad = stub().returns({
        source: 'const a = 5;',
    });
    
    const url = 'file://hello.js';
    const context = {
    };
    
    const {source} = await load(url, context, defaultLoad);
    const expected = `'use strict';`;
    
    t.equal(source, expected);
    t.end();
});

test('putout: esm', (t) => {
    const {code} = putout('const a = 5', {
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    t.notOk(code);
    t.end();
});

