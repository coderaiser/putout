'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['putout/apply-vars', plugin],
    ],
});

test('plugin-putout: apply-vars: report', (t) => {
    t.report('apply-vars', `Use 'vars' instead of '{}'`);
    t.end();
});

test('plugin-putout: apply-vars: transform', (t) => {
    t.transform('apply-vars');
    t.end();
});

test('plugin-putout: apply-vars: transform: no-body', (t) => {
    t.transform('no-body');
    t.end();
});
