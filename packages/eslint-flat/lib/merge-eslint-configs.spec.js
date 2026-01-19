import {pathToFileURL, fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {test, stub} from 'supertape';
import {mergeESLintConfigs} from './flat.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('eslint-flat: mergeESLintConfigs', async (t) => {
    const readdir = stub().resolves(['world']);
    const readESLintConfig = stub().resolves([{
        rules: {
            semi: 'error',
        },
    }]);
    
    const result = await mergeESLintConfigs(__dirname, ['./hello'], {
        readdir,
        readESLintConfig,
    });
    
    const expected = [{
        files: [
            '**/hello/world',
        ],
        rules: {
            semi: 'error',
        },
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('eslint-flat: mergeESLintConfigs: not array', async (t) => {
    const readdir = stub().resolves(['world']);
    const readESLintConfig = stub().resolves([{
        rules: {
            semi: 'error',
        },
    }]);
    
    const result = await mergeESLintConfigs(__dirname, './hello', {
        readdir,
        readESLintConfig,
    });
    
    const expected = [{
        files: [
            '**/hello/world',
        ],
        rules: {
            semi: 'error',
        },
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('eslint-flat: mergeESLintConfigs: ignores', async (t) => {
    const readdir = stub().resolves(['world']);
    const readESLintConfig = stub().resolves([{
        rules: {
            semi: 'error',
        },
        ignores: ['**/fixture'],
    }]);
    
    const result = await mergeESLintConfigs(__dirname, './hello', {
        readdir,
        readESLintConfig,
    });
    
    const expected = [{
        files: [
            '**/hello/world',
        ],
        ignores: [
            '**/hello/world/**/fixture',
        ],
        rules: {
            semi: 'error',
        },
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('eslint-flat: mergeESLintConfigs: import.meta.url', async (t) => {
    const readdir = stub().resolves(['world']);
    const readESLintConfig = stub().resolves([{
        rules: {
            semi: 'error',
        },
    }]);
    
    const result = await mergeESLintConfigs(pathToFileURL(__filename).href, ['./hello'], {
        readdir,
        readESLintConfig,
    });
    
    const expected = [{
        files: [
            '**/hello/world',
        ],
        rules: {
            semi: 'error',
        },
    }];
    
    t.deepEqual(result, expected);
    t.end();
});
