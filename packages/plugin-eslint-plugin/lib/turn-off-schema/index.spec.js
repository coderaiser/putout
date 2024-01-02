'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['turn-off-schema', plugin],
    ],
});

test('packages: turn-off-schema: report', (t) => {
    t.report('turn-off-schema', `Turn off schema`);
    t.end();
});

test('packages: turn-off-schema: no report', (t) => {
    t.noReport('bool');
    t.end();
});

test('packages: turn-off-schema: transform', (t) => {
    t.transform('turn-off-schema');
    t.end();
});
