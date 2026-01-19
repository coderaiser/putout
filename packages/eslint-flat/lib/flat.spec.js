import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {test} from 'supertape';
import {
    matchToFlat,
    matchToFlatDir,
    createESLintConfig,
} from './flat.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('eslint-flat: matchToFlat', (t) => {
    const result = matchToFlat({
        hello: {
            semi: 'off',
        },
    });
    
    const expected = [{
        files: ['hello'],
        rules: {
            semi: 'off',
        },
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('eslint-flat: matchToFlatDir', async (t) => {
    const result = await matchToFlatDir(__dirname, './hello', {
        match: {
            world: {
                semi: 'off',
            },
        },
    });
    
    const expected = [{
        files: ['**/hello/world'],
        rules: {
            semi: 'off',
        },
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('eslint-flat: matchToFlatDir: not found', async (t) => {
    const config = await matchToFlatDir(__dirname, './hello');
    
    t.deepEqual(config, []);
    t.end();
});

test('eslint-flat: matchToFlatDir: no match', async (t) => {
    const result = await matchToFlatDir(__dirname, './hello', [{
        files: ['world'],
        rules: {
            semi: 'off',
        },
    }]);
    
    const expected = [{
        files: ['**/hello/world'],
        rules: {
            semi: 'off',
        },
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('eslint-flat: createESLintConfig', (t) => {
    const configA = [{
        files: ['world'],
        rules: {
            semi: 'off',
        },
    }, {
        files: ['world'],
        rules: {
            semi: 'off',
        },
    }];
    
    const configB = [{
        files: ['world'],
        rules: {
            semi: 'off',
        },
    }, {
        files: ['world'],
        rules: {
            semi: 'off',
        },
    }];
    
    const result = createESLintConfig([configA, configB]);
    
    const expected = [configA, configB].flat();
    
    t.deepEqual(result, expected);
    t.end();
});
