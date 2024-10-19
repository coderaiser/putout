'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-useless-variables/declarations', plugin],
    ],
});

test('remove useless variables: declaration: report', (t) => {
    t.report('declaration', 'Avoid useless declarations');
    t.end();
});

test('remove useless variables: declaration: transform', (t) => {
    t.transform('declaration');
    t.end();
});

test('remove useless variables: declaration: transform: assign', (t) => {
    t.transform('assign');
    t.end();
});

test('remove useless variables: declaration: no transform: destruct', (t) => {
    t.noTransform('destruct');
    t.end();
});

test('remove useless variables: declaration: no transform: changed', (t) => {
    t.noTransform('changed');
    t.end();
});

test('remove useless variables: declaration: no transform: object', (t) => {
    t.noTransform('object');
    t.end();
});

test('remove useless variables: declaration: no transform: no-init', (t) => {
    t.noTransform('no-init');
    t.end();
});

test('remove useless variables: declaration: no transform: couple-lines', (t) => {
    t.noTransform('couple-lines');
    t.end();
});

test('remove useless variables: declaration: no transform: fn', (t) => {
    t.noTransform('fn');
    t.end();
});

test('remove useless variables: declaration: no transform: assign-couple', (t) => {
    t.noTransform('assign-couple');
    t.end();
});

test('remove useless variables: declaration: no transform: length', (t) => {
    t.noTransform('length');
    t.end();
});

test('remove useless variables: declaration: transform: max length', (t) => {
    t.transform('max-length');
    t.end();
});

test('remove useless variables: declaration: no transform: max length disabled', (t) => {
    t.noTransformWithOptions('max-length-disabled', {
        maxLength: 10,
    });
    t.end();
});

test('remove useless variables: declaration: no transform: no-binding', (t) => {
    t.noTransform('no-binding');
    t.end();
});

test('remove useless variables: declaration: no transform: for-of', (t) => {
    t.noTransform('for-of');
    t.end();
});

test('remove useless variables: declaration: no transform: module-exports', (t) => {
    t.noTransform('module-exports');
    t.end();
});

test('remove useless variables: declaration: no transform: other-scope', (t) => {
    t.noTransform('other-scope');
    t.end();
});

test('remove useless variables: declaration: no transform: re-assigned', (t) => {
    t.noTransform('re-assign');
    t.end();
});
