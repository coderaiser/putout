'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-useless-array-in-run', plugin],
    ],
});

test('packages: remove-useless-array-in-run: report', (t) => {
    t.report('remove-useless-array-in-run', `Avoid useless array when pass arguments to 'run()'`);
    t.end();
});

test('packages: remove-useless-array-in-run: transform', (t) => {
    t.transform('remove-useless-array-in-run');
    t.end();
});
