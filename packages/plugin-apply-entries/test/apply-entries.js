'use strict';

const {createTest} = require('@putout/test');
const plugin = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['apply-entries', plugin],
    ],
});

test('putout: apply-entries: report', (t) => {
    t.report('apply-entries', `Use 'entries()' instead of '.entries()`);
    t.end();
});

test('putout: apply-entries: transform', (t) => {
    t.transform('apply-entries');
    t.end();
});

test('putout: apply-entries: no transform: declared', (t) => {
    t.noTransform('declared');
    t.end();
});
