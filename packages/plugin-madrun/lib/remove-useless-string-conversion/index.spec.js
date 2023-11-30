'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-useless-string-conversion', plugin],
    ],
});

test('packages: remove-useless-string-conversion: report', (t) => {
    t.report('remove-useless-string-conversion', `Remove useless String conversion`);
    t.end();
});

test('packages: remove-useless-string-conversion: transform', (t) => {
    t.transform('remove-useless-string-conversion');
    t.end();
});
