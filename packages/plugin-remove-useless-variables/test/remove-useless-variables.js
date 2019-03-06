'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-useless-variables': require('..'),
});

test('remove usless variables: report', (t) => {
    t.report('function', 'Useless variable declaration with name "b"');
    t.end();
});

test('remove usless variables: transform', (t) => {
    t.transform('function');
    t.end();
});

