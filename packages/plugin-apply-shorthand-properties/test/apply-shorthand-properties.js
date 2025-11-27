import * as removeUnusedVariables from '@putout/plugin-remove-unused-variables';
import {createTest} from '@putout/test';
import * as applyShorthandProperties from '../lib/apply-shorthand-properties.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-shorthand-properties', applyShorthandProperties],
    ],
});

const testWithRemove = createTest(import.meta.url, {
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

test('plugin-apply-shorthand-properties: transform with options: object', (t) => {
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

test('plugin-apply-shorthand-properties: no transform with options: options', (t) => {
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

test('plugin-apply-shorthand-properties: no transform with options: destr', (t) => {
    t.noTransformWithOptions('destr', {
        rename: true,
    });
    t.end();
});

test('plugin-apply-shorthand-properties: no transform with options: import', (t) => {
    t.noTransformWithOptions('import', {
        rename: true,
    });
    t.end();
});

test('plugin-apply-shorthand-properties: no transform with options: name-exists', (t) => {
    t.noTransformWithOptions('name-exists', {
        rename: true,
    });
    t.end();
});

test('plugin-apply-shorthand-properties: no transform with options: overlap', (t) => {
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

test('plugin-apply-shorthand-properties: transform: computed', (t) => {
    t.transform('computed');
    t.end();
});

test('plugin-apply-shorthand-properties: no report: spread', (t) => {
    t.noReport('spread');
    t.end();
});

test('plugin-apply-shorthand-properties: no report: default', (t) => {
    t.noReport('default');
    t.end();
});

testWithRemove('plugin-apply-shorthand-properties: transform with options: assign', (t) => {
    t.transformWithOptions('assign', {
        rename: true,
    });
    t.end();
});
