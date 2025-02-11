'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['reverse-condition', plugin],
    ],
});

test('conditions: reverse-condition: report', (t) => {
    t.report('reverse-condition', `Avoid useless '!'`);
    t.end();
});

test('conditions: reverse-condition: transform', (t) => {
    t.transform('reverse-condition');
    t.end();
});

test('conditions: reverse-condition: transform: and', (t) => {
    t.transform('and');
    t.end();
});

test('conditions: reverse-condition: transform: or', (t) => {
    t.transform('or');
    t.end();
});

test('conditions: reverse-condition: transform: not-or', (t) => {
    t.transform('not-or');
    t.end();
});
