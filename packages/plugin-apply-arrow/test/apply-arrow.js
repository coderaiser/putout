'use strict';

const {createTest} = require('@putout/test');
const plugin = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['apply-arrow', plugin],
    ],
});

test('putout: apply-arrow: report', (t) => {
    t.report('apply-arrow', `Use 'Arrow Function' instead of 'Function Declaration`);
    t.end();
});

test('putout: apply-arrow: transform', (t) => {
    t.transform('apply-arrow');
    t.end();
});

test('putout: apply-arrow: no report: long', (t) => {
    t.noReport('long');
    t.end();
});
