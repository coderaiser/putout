'use strict';

const test = require('supertape');
const containEslintPlugin = require('./contain-eslint-plugin');

test('putout: cli: cache-files: contain-eslint-plugin', (t) => {
    const result = containEslintPlugin([{
        rule: 'eslint/no-var',
    }]);
    
    t.notOk(result, 'should not contain eslint plugin');
    t.end();
});

test('putout: cli: cache-files: contain-eslint-plugin', (t) => {
    const result = containEslintPlugin([{
        rule: 'eslint/node/missing-require',
    }]);
    
    t.ok(result, 'should contain eslint plugin');
    t.end();
});

