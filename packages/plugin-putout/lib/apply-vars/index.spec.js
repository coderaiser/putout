'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['apply-vars', plugin],
    ],
});

test('putout: apply-vars: report', (t) => {
    t.report('apply-vars', `Use 'var' instead of '{}'`);
    t.end();
});

test('putout: apply-vars: transform', (t) => {
    t.transform('apply-vars');
    t.end();
});
