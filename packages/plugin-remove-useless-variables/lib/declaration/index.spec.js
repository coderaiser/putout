'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-useless-variables/declarations', plugin],
    ],
});

test('remove usless variables: declaration: report', (t) => {
    t.report('declaration', 'Avoid useless declarations');
    t.end();
});

test('remove usless variables: declaration: transform', (t) => {
    t.transform('declaration');
    t.end();
});

test('remove usless variables: declaration: no transform: destruct', (t) => {
    t.noTransform('destruct');
    t.end();
});

test('remove usless variables: declaration: no transform: changed', (t) => {
    t.noTransform('changed');
    t.end();
});

test('remove usless variables: declaration: no transform: object', (t) => {
    t.noTransform('object');
    t.end();
});

test('remove usless variables: declaration: no transform: couple-lines', (t) => {
    t.noTransform('couple-lines');
    t.end();
});
