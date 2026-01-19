import {test, stub} from 'supertape';
import {readESLintConfig} from './read-eslint-config.js';

test('flat-eslint: importESLintConfig: found eslint.config.js', async (t) => {
    const read = stub().resolves({
        default: [],
    });
    
    const result = await readESLintConfig('./hello', {
        read,
    });
    
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});

test('flat-eslint: importESLintConfig: not found eslint.config.js', async (t) => {
    const readFile = stub().resolves('{}');
    const result = await readESLintConfig('./hello', {
        readFile,
    });
    
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});
