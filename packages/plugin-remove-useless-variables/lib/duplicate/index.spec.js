'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['duplicate', plugin],
    ],
});

test('remove-useless-variables: duplicate: report', (t) => {
    t.report('duplicate', `Avoid duplicate declaration`);
    t.end();
});

test('remove-useless-variables: duplicate: transform', (t) => {
    t.transform('duplicate');
    t.end();
});
