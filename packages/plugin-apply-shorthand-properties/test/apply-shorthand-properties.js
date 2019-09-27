'use strict';

const test = require('@putout/test')(__dirname, {
    'apply-shorthand-properties': require('..'),
});

test('plugin-apply-shorthand-properties: report', (t) => {
    t.report('object', 'Shorthand properties should be used');
    t.end();
});

test('plugin-apply-shorthand-properties: no transform: shorthand', (t) => {
    t.noReport('shorthand');
    t.end();
});

test('plugin-apply-shorthand-properties: transform', (t) => {
    t.transform('object');
    t.end();
});

test('plugin-apply-shorthand-properties: transform: options', (t) => {
    t.noTransformWithOptions('options', {
        ignore: [
            'plugin',
        ],
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
    t.noTransform('destr');
    t.end();
});

test('plugin-apply-shorthand-properties: no transform: destructuring', (t) => {
    t.noTransform('import');
    t.end();
});

test('plugin-apply-shorthand-properties: no transform: name exists', (t) => {
    t.noTransform('name-exists');
    t.end();
});

test('plugin-apply-shorthand-properties: no transform: names overlap', (t) => {
    t.noTransform('overlap');
    t.end();
});
