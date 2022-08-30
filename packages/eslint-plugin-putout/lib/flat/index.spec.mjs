import {test} from 'supertape';
import {lint} from '@putout/eslint/lint';

import {readFileSync} from 'fs';
import {
    recommended,
    safe,
    safeAlign,
} from './index.js';

test('eslint-plugin-putout: flat: recommended', (t) => {
    const [code] = lint('debugger', {
        options: recommended,
        filename: import.meta.url.replace('file://', ''),
    });
    
    t.notOk(code);
    t.end();
});

test('eslint-plugin-putout: flat: safe', (t) => {
    const [code] = lint('debugger', {
        options: safe,
        filename: import.meta.url.replace('file://', ''),
    });
    
    const expected = 'debugger;\n';
    
    t.equal(code, expected);
    t.end();
});

test('eslint-plugin-putout: flat: safe-align', (t) => {
    const source = readFileSync(new URL('fixture/safe-align.js', import.meta.url).pathname, 'utf8');
    const fixture = readFileSync(new URL('fixture/safe-align-fix.js', import.meta.url).pathname, 'utf8');
    
    const [code] = lint(source, {
        options: safeAlign,
        filename: import.meta.url.replace('file://', ''),
    });
    
    t.equal(code, fixture);
    t.end();
});
