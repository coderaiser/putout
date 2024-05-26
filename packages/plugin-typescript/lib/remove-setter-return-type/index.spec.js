'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['typescript/remove-setter-return-type', plugin],
    ],
});

test('plugin-typescript: remove-setter-return-type: report', (t) => {
    t.report('remove-setter-return-type', 'Avoid setter return type');
    t.end();
});

test('plugin-typescript: remove-setter-return-type: transform', (t) => {
    t.transform('remove-setter-return-type');
    t.end();
});

test('plugin-typescript: remove-setter-return-type: no transform: getter', (t) => {
    t.noTransform('getter');
    t.end();
});
