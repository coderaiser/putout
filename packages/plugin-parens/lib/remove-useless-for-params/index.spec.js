'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['remove-useless-for-params', plugin],
    ],
});

test('parens: remove-useless-for-params: report', (t) => {
    t.report('remove-useless-for-params', `Avoid useless parens: '(b)' -> 'b'`);
    t.end();
});

test('parens: remove-useless-for-params: transform', (t) => {
    t.transform('remove-useless-for-params');
    t.end();
});
