import {readFileSync} from 'node:fs';
import {test} from 'supertape';
import {lint} from '@putout/eslint/lint';
import {
    recommended,
    safe,
    safeAlign,
} from './index.mjs';

test('eslint-plugin-putout: config: recommended', (t) => {
    const [code] = lint('debugger', {
        options: recommended,
        filename: import.meta.url.replace('file://', ''),
    });
    
    t.notOk(code);
    t.end();
});

test('eslint-plugin-putout: config: safe', (t) => {
    const [code] = lint('debugger', {
        options: safe,
        filename: import.meta.url.replace('file://', ''),
    });
    
    const expected = 'debugger;\n';
    
    t.equal(code, expected);
    t.end();
});

test('eslint-plugin-putout: config: safe-align', (t) => {
    const source = readFileSync(new URL('fixture/safe-align.js', import.meta.url).pathname, 'utf8');
    const fixture = readFileSync(new URL('fixture/safe-align-fix.js', import.meta.url).pathname, 'utf8');
    
    const [code] = lint(source, {
        options: safeAlign,
        filename: import.meta.url.replace('file://', ''),
    });
    
    t.equal(code, fixture);
    t.end();
});
