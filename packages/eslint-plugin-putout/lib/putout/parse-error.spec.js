import test from 'supertape';
import {parseError} from './parse-error.js';

test('eslint-plugin-putout: putout: parse-error', (t) => {
    const message = `Cannot read properties of undefined (reading 'buildError')`;
    const result = parseError({
        message,
    });
    
    const expected = 'Parser error';
    
    t.equal(result, expected);
    t.end();
});

test('eslint-plugin-putout: putout: parse-error: unexpected error', (t) => {
    const message = `Unexpected error`;
    const result = parseError({
        message,
    });
    
    const expected = 'Unexpected error';
    
    t.equal(result, expected);
    t.end();
});

test('eslint-plugin-putout: putout: parse-error: ESM', (t) => {
    const message = `Unexpected error`;
    const code = 'ERR_REQUIRE_ESM';
    const name = 'xx.js';
    
    const result = parseError({
        name,
        code,
        message,
    });
    
    const expected = `☝️ Looks like 'xx.js' is ESM, consider updating node to >= v20.19`;
    
    t.equal(result, expected);
    t.end();
});
