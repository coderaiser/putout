'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['assign', plugin],
    ],
});

test('packages: assign: report', (t) => {
    t.report('assign', `Use Logical Expression ('a && a.b = c') instead of Optional Chaining ('a?.b = c')`);
    t.end();
});

test('packages: assign: transform', (t) => {
    t.transform('assign');
    t.end();
});

test('packages: assign: no transform call', (t) => {
    t.noTransform('call');
    t.end();
});
