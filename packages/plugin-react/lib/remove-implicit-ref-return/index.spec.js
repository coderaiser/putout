'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['remove-implicit-ref-return', plugin],
    ],
});

test('react: remove-implicit-ref-return: report', (t) => {
    t.report('remove-implicit-ref-return', `Remove implicit 'ref' return`);
    t.end();
});

test('react: remove-implicit-ref-return: transform', (t) => {
    t.transform('remove-implicit-ref-return');
    t.end();
});
