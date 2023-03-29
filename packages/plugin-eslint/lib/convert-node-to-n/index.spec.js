'use strict';

const {createTest} = require('@putout/test');
const convertIdeToSafe = require('.');

const test = createTest(__dirname, {
    'eslint/convert-node-to-n': convertIdeToSafe,
});

test('putout: plugin-eslint: convert-node-to-n: report', (t) => {
    t.report('node', `Use 'n' instead of 'node'`);
    t.end();
});

test('putout: plugin-eslint: convert-node-to-n: transform', (t) => {
    t.transform('node');
    t.end();
});

test('putout: plugin-eslint: convert-node-to-n: transform: plugins', (t) => {
    t.transform('plugins');
    t.end();
});

