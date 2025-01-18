'use strict';

const {createTest} = require('@putout/test');
const convertIdeToSafe = require('./index.js');

const test = createTest(__dirname, {
    'eslint/convert-node-to-n': convertIdeToSafe,
});

test('putout: plugin-eslint: convert-node-to-n: report: node', (t) => {
    t.report('node', `Use 'n' instead of 'node'`);
    t.end();
});

test('putout: plugin-eslint: convert-node-to-n: transform: node', (t) => {
    t.transform('node');
    t.end();
});

test('putout: plugin-eslint: convert-node-to-n: transform: plugins', (t) => {
    t.transform('plugins');
    t.end();
});
