'use strict';

const {createTest} = require('@putout/test');
const declare = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['printer/remove-args', declare],
    ],
});

test('rule: remove-args: transform', (t) => {
    t.transform('remove-args');
    t.end();
});

test('rule: remove-args: transform: traverse', (t) => {
    t.transform('remove-args');
    t.end();
});

