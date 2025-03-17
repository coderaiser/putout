'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['assignment', plugin],
    ],
});

test('remove-useless-variables: assignment: report', (t) => {
    t.report('assignment', `Avoid useless assign`);
    t.end();
});

test('remove-useless-variables: assignment: transform', (t) => {
    t.transform('assignment');
    t.end();
});
