'use strict';

const {createTest} = require('@putout/test');
const destruct = require('.');

const test = createTest(__dirname, {
    'remove-useless-variables/destruct': destruct,
});

test('remove-useless-variables: destruct: report', (t) => {
    t.report('destruct', `Remove useless variable 'args'`);
    t.end();
});

test('remove-useless-variables: destruct: transform', (t) => {
    t.transform('destruct');
    t.end();
});

test('remove-useless-variables: destruct: transform: references', (t) => {
    t.noTransform('references');
    t.end();
});

test('remove-useless-variables: destruct: transform: not-first', (t) => {
    t.noTransform('not-first');
    t.end();
});

test('remove-useless-variables: destruct: transform: not-one', (t) => {
    t.noTransform('not-one');
    t.end();
});

test('remove-useless-variables: destruct: transform: spread', (t) => {
    t.transform('spread');
    t.end();
});

