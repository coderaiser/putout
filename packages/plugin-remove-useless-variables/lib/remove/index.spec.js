'use strict';

const {createTest} = require('@putout/test');

const reuseDuplicateInit = require('@putout/plugin-reuse-duplicate-init');
const remove = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['remove-useless-variables/remove', remove],
    ],
});

test('remove useless variables: remove: report: require', (t) => {
    t.report('require', 'Useless variable declaration with name "child_process"');
    t.end();
});

test('remove useless variables: remove: no transform: swap', (t) => {
    t.noTransform('swap');
    t.end();
});

test('remove useless variables: remove: transform: require', (t) => {
    t.transform('require');
    t.end();
});

test('remove useless variables: remove: transform: assign', (t) => {
    t.transform('assign');
    t.end();
});

test('remove useless variables: remove: no transform: react', (t) => {
    t.noTransform('react');
    t.end();
});

test('remove useless variables: remove: no transform: if', (t) => {
    t.noTransform('if');
    t.end();
});

test('remove useless variables: remove: no transform: vice-versa', (t) => {
    t.noTransform('vice-versa');
    t.end();
});

test('plugin-reuse-duplicate-init: transform: with-reuse', (t) => {
    t.transform('with-reuse', {
        'reuse-duplicate-init': reuseDuplicateInit,
    });
    t.end();
});
