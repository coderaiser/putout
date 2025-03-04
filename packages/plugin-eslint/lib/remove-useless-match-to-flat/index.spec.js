'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['remove-useless-match-to-flat', plugin],
    ],
});

test('eslint: remove-useless-match-to-flat: report', (t) => {
    t.report('remove-useless-match-to-flat', `Avoid useless 'matchToFlat()'`);
    t.end();
});

test('eslint: remove-useless-match-to-flat: transform', (t) => {
    t.transform('remove-useless-match-to-flat');
    t.end();
});
