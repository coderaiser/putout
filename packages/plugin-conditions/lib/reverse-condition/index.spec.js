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
