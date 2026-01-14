import test from 'supertape';
import {enableNestedRules} from './enable-nested-rules.js';

test('putout: loader: rules: enable-nested-rules: enabled partially', (t) => {
    const result = enableNestedRules({
        'convert-commonjs-to-esm': 'off',
        'convert-commonjs-to-esm/require': 'on',
    });
    
    const expected = {
        'convert-commonjs-to-esm': 'on',
        'convert-commonjs-to-esm/require': 'on',
    };
    
    t.deepEqual(result, expected);
    t.end();
});
