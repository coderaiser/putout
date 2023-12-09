'use strict';

const {createTest} = require('@putout/test');
const strictMode = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['strict-mode', strictMode],
    ],
});

test('plugin-strict-mode: transform', (t) => {
    t.transform('commonjs');
    t.end();
});

test('plugin-strict-mode: transform: esm', (t) => {
    t.transform('esm');
    t.end();
});
