'use strict';

const {createTest} = require('@putout/test');
const minify = require('..');

const test = createTest(__dirname, {
    minify,
});

test('plugin-minify: transform: remove-return-undefined', (t) => {
    t.transform('remove-return-undefined');
    t.end();
});
