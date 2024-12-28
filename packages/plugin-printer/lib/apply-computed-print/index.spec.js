'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['printer/apply-computed-print', plugin],
    ],
});

test('plugin-printer: apply-computed-print: report', (t) => {
    t.report('apply-computed-print', `Use print('__path') instead of path.get(__path)`);
    t.end();
});

test('plugin-printer: apply-computed-print: transform', (t) => {
    t.transform('apply-computed-print');
    t.end();
});
