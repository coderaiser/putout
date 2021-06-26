import test from 'supertape';
import putout, {
    transformSource,
} from './putout.mjs';

test('putout: esm: transformSource', (t) => {
    const context = {
        url: 'file://hello.js',
    };
    
    const {source} = transformSource('const a = 5;', context);
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

