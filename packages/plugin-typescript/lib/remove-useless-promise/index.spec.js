'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['typescript/remove-useless-promise', plugin],
    ],
});

test('typescript: remove useless promise: report: remove-useless-promise', (t) => {
    t.report('remove-useless-promise', `Avoid useless 'Promise' type`);
    t.end();
});

test('typescript: remove useless promise: transform: remove-useless-promise', (t) => {
    t.transform('remove-useless-promise');
    t.end();
});
