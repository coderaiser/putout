import test, {stub} from 'supertape';
import putout, {load} from './putout.mjs';

test('putout: esm: load', async (t) => {
    const defaultLoad = stub().returns({
        source: 'const a = 5; module.exports = a;',
    });
    
    const url = 'file://hello.js';
    
    const context = {};
    
    const {source} = await load(url, context, defaultLoad);
    const expected = `'use strict';\n\nmodule.exports = 5;\n`;
    
    t.equal(source, expected);
    t.end();
});

test('putout: esm', (t) => {
    const {code} = putout('const a = 5', {
        plugins: ['remove-unused-variables'],
    });
    
    t.equal(code, '\n');
    t.end();
});
