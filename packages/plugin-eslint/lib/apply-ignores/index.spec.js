'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['apply-ignores', plugin],
    ],
});

test('eslint: apply-ignores: report', (t) => {
    t.report('apply-ignores', `Ignore 'fixture'`);
    t.end();
});

test('eslint: apply-ignores: transform', (t) => {
    t.transform('apply-ignores');
    t.end();
});

test('eslint: apply-ignores: transform with options: options', (t) => {
    t.transformWithOptions('options', {
        ignores: ['**/fixtures', '**/tests'],
    });
    t.end();
});
