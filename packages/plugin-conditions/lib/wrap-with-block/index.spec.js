'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['wrap-with-block', plugin],
    ],
});

test('conditions: wrap-with-block: report', (t) => {
    t.report('wrap-with-block', `Lexical declaration cannot appear in single-statement-context`);
    t.end();
});

test('conditions: wrap-with-block: transform', (t) => {
    t.transform('wrap-with-block');
    t.end();
});
