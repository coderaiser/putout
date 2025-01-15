'use strict';

const {createTest} = require('@putout/test');
const strictMode = require('..');

const test = createTest(__dirname, {
    printer: 'recast',
    plugins: [
        ['strict-mode', strictMode],
    ],
});

test('plugin-strict-mode: recast: transform: recast-commonjs', (t) => {
    t.transform('recast-commonjs');
    t.end();
});

test('plugin-strict-mode: recast: transform: recast-esm', (t) => {
    t.transform('recast-esm');
    t.end();
});
