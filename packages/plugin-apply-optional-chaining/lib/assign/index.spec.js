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
    t.report('assign', `Use optional expression ('a?.b = c') instead of 'condition' ('a && a.b = c')`);
    t.end();
});

test('packages: assign: transform', (t) => {
    t.transform('assign');
    t.end();
});
