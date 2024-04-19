'use strict';

const {test} = require('supertape');
const tryCatch = require('try-catch');

const {matchToFlat, matchToFlatDir} = require('./flat');

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

test('eslint-flat: matchToFlatDir', (t) => {
    const result = matchToFlatDir('./hello', {
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

test('eslint-flat: matchToFlatDir: require', (t) => {
    const [error] = tryCatch(matchToFlatDir, './hello');
    
    t.ok(error);
    t.end();
});

test('eslint-flat: matchToFlatDir: no match', (t) => {
    const result = matchToFlatDir('./hello', [{
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
