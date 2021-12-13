'use strict';

const {createTest} = require('@putout/test');
const putoutConfig = require('..');

const test = createTest(__dirname, {
    'putout-config': putoutConfig,
});

test('plugin-putout-config: transform: convert-boolean-to-string', (t) => {
    t.transform('convert-boolean-to-string');
    t.end();
});

test('plugin-putout-config: transform: remove-empty', (t) => {
    t.transform('remove-empty');
    t.end();
});

