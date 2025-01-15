'use strict';

const {createTest} = require('@putout/test');
const convertIdeToSafe = require('./index.js');

const test = createTest(__dirname, {
    'eslint/convert-safe-to-safe-align': convertIdeToSafe,
});

test('putout: plugin-eslint: convert-safe-to-safe-align: report', (t) => {
    t.report('safe', 'Use "putout/safe+align" instead of "putout/safe"');
    t.end();
});

test('putout: plugin-eslint: convert-safe-to-safe-align: transform', (t) => {
    t.transform('safe');
    t.end();
});

test('putout: plugin-eslint: convert-safe-to-safe-align: no transform: no-safe', (t) => {
    t.noTransform('no-safe');
    t.end();
});
