'use strict';

const {test, stub} = require('supertape');
const {matchToFlatDir} = require('./match-to-flat-dir');
const noop = () => {};

test('eslint-flat: matchToFlatDir: no files', async (t) => {
    const result = await matchToFlatDir('./hello', [{
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
    
    const result = await matchToFlatDir('./hello', config);
    
    t.deepEqual(result, config);
    t.end();
});

test('eslint-flat: matchToFlatDir: ignores', async (t) => {
    const result = await matchToFlatDir('./hello', [{
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
    const result = await matchToFlatDir('./hello', [{
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
