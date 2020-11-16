'use strict';

const test = require('supertape');
const containEslintPlugin = require('./contain-eslint-plugin');

test('putout: cli: cache-files: contain-eslint-plugin: no', (t) => {
    const result = containEslintPlugin([{
        rule: 'no-var (eslint)',
    }]);
    
    t.notOk(result, 'should not contain eslint plugin');
    t.end();
});

test('putout: cli: cache-files: contain-eslint-plugin: yes', (t) => {
    const result = containEslintPlugin([{
        rule: 'node/missing-require (eslint)',
    }]);
    
    t.ok(result, 'should contain eslint plugin');
    t.end();
});

test('putout: cli: cache-files: contain-eslint-plugin: eslint-plugin-putout', (t) => {
    const result = containEslintPlugin([{
        rule: 'putout/keyword-spacing (eslint)',
    }]);
    
    t.notOk(result, 'should ignore eslint-plugin-putout');
    t.end();
});

