'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['convert-optional-to-logical/assign', plugin],
    ],
});

test('convert-optional-to-logical: assign: report', (t) => {
    t.report('assign', `Use Logical Expression ('a && a.b = c') instead of Optional Chaining ('a?.b = c')`);
    t.end();
});

test('convert-optional-to-logical: assign: transform', (t) => {
    t.transform('assign');
    t.end();
});

test('convert-optional-to-logical: assign: no transform call', (t) => {
    t.noTransform('call');
    t.end();
});
