'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['rename-rules', plugin],
    ],
});

test('putout-config: rename-rules: report', (t) => {
    t.report('rename-rules', `Rename property: 'declare-undefined-variables' -> 'declare'`);
    t.end();
});

test('putout-config: rename-rules: transform', (t) => {
    t.transform('rename-rules');
    t.end();
});

