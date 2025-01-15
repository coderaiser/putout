'use strict';

const removeUnusedVariables = require('@putout/plugin-remove-unused-variables');
const {createTest} = require('@putout/test');
const applyShorthandProperties = require('../lib/apply-shorthand-properties.js');

const test = createTest(__dirname, {
    plugins: [
        ['apply-shorthand-properties', applyShorthandProperties],
    ],
});

const testWithRemove = createTest(__dirname, {
    plugins: [
        ['apply-shorthand-properties', applyShorthandProperties],
        ['rm-unused-vars', removeUnusedVariables],
    ],
});

test('plugin-apply-shorthand-properties: report', (t) => {
    t.reportWithOptions('object', 'Use shorthand properties', {
        rename: true,
    });
    t.end();
});

test('plugin-apply-shorthand-properties: no report: shorthand', (t) => {
    t.noReport('shorthand');
    t.end();
});

test('plugin-apply-shorthand-properties: transform', (t) => {
    t.transformWithOptions('object', {
        rename: true,
    });
    t.end();
});

test('plugin-apply-shorthand-properties: transform: destructuring', (t) => {
    t.transform('destructuring');
    t.end();
});

test('plugin-apply-shorthand-properties: transform: as', (t) => {
    t.transform('as');
    t.end();
});

test('plugin-apply-shorthand-properties: transform: rename-and-destructuring', (t) => {
    t.transform('rename-and-destructuring');
    t.end();
});

test('plugin-apply-shorthand-properties: transform: options', (t) => {
    t.noTransformWithOptions('options', {
        ignore: ['plugin'],
    });
    t.end();
});

test('plugin-apply-shorthand-properties: no transform: references', (t) => {
    t.noTransform('references');
    t.end();
});

test('plugin-apply-shorthand-properties: no transform: not-valid', (t) => {
    t.noTransform('not-valid');
    t.end();
});

test('plugin-apply-shorthand-properties: no transform: destructuring', (t) => {
    t.noTransformWithOptions('destr', {
        rename: true,
    });
    t.end();
});

test('plugin-apply-shorthand-properties: no transform: import', (t) => {
    t.noTransformWithOptions('import', {
        rename: true,
    });
    t.end();
});

test('plugin-apply-shorthand-properties: no transform: name exists', (t) => {
    t.noTransformWithOptions('name-exists', {
        rename: true,
    });
    t.end();
});

test('plugin-apply-shorthand-properties: no transform: names overlap', (t) => {
    t.noTransformWithOptions('overlap', {
        rename: true,
    });
    t.end();
});

test('plugin-apply-shorthand-properties: no transform: constant', (t) => {
    t.noTransform('constant');
    t.end();
});

test('plugin-apply-shorthand-properties: no transform: import-declaration', (t) => {
    t.noTransform('import-declaration');
    t.end();
});

testWithRemove('plugin-apply-shorthand-properties: transform: assign', (t) => {
    t.transformWithOptions('assign', {
        rename: true,
    });
    t.end();
});
