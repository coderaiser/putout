'use strict';

const {createTest} = require('@putout/test');
const convertFindToTraverse = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-return-undefined', convertFindToTraverse],
    ],
});

test('plugin-putout: convert report to function: report', (t) => {
    t.report('remove-return-undefined', `Avoid 'return undefined'`);
    t.end();
});

test('plugin-putout: convert report to function: transform', (t) => {
    t.transform('remove-return-undefined');
    t.end();
});
