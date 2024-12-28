'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['typescript/remove-getter-arguments', plugin],
    ],
});

test('plugin-typescript: remove-getter-arguments: report', (t) => {
    t.report('remove-getter-arguments', 'Avoid getter arguments');
    t.end();
});

test('plugin-typescript: remove-getter-arguments: transform', (t) => {
    t.transform('remove-getter-arguments');
    t.end();
});

test('plugin-typescript: remove-getter-arguments: no transform: setter', (t) => {
    t.noTransform('setter');
    t.end();
});
