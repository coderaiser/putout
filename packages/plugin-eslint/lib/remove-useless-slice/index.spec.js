'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-useless-slice', plugin],
    ],
});

test('eslint: remove-useless-slice: report', (t) => {
    t.report('remove-useless-slice', `Avoid useless '.slice()' in Flat Config`);
    t.end();
});

test('eslint: remove-useless-slice: transform', (t) => {
    t.transform('remove-useless-slice');
    t.end();
});
