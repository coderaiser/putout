import {pathToFileURL, fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {test, stub} from 'supertape';
import {matchToFlatDir} from './match-to-flat-dir.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const noop = () => {};

test('eslint-flat: matchToFlatDir: no files', async (t) => {
    const result = await matchToFlatDir(pathToFileURL(__filename).href, './hello', [{
        languageOptions: {
            sourceType: 'module',
        },
    }]);
    
    const expected = [{
        files: ['**/hello'],
        languageOptions: {
            sourceType: 'module',
        },
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('eslint-flat: matchToFlatDir: files: fn', async (t) => {
    const config = [{
        files: [noop],
        languageOptions: {
            sourceType: 'module',
        },
    }];
    
    const result = await matchToFlatDir(__dirname, './hello', config);
    
    t.deepEqual(result, config);
    t.end();
});

test('eslint-flat: matchToFlatDir: ignores', async (t) => {
    const result = await matchToFlatDir(__dirname, './hello', [{
        ignores: ['**/fixture'],
    }]);
    
    const expected = [{
        files: ['**/hello'],
        ignores: [
            '**/hello/**/fixture',
        ],
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('eslint-flat: matchToFlatDir: ignores: fn', async (t) => {
    const result = await matchToFlatDir(__dirname, './hello', [{
        ignores: [stub()],
    }]);
    
    const expected = [{
        files: ['**/hello'],
        ignores: [
            stub(),
        ],
    }];
    
    t.deepEqual(result, expected);
    t.end();
});
