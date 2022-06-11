'use strict';

const {createTest} = require('@putout/test');
const object = require('.');

const test = createTest(__dirname, {
    'remove-useless-spread/object': object,
});

test('plugin-remove-useless-spread: object: report', (t) => {
    t.report('object', `Avoid useless spread '...'`);
    t.end();
});

test('plugin-remove-useless-spread: object: transform: object', (t) => {
    t.transform('object');
    t.end();
});

test('plugin-remove-useless-spread: object: no transform: same', (t) => {
    t.noTransform('same');
    t.end();
});

test('plugin-remove-useless-spread: object: no transform: logical', (t) => {
    t.noTransform('logical');
    t.end();
});

test('plugin-remove-useless-spread: object: no transform: comment', (t) => {
    t.noTransform('comment');
    t.end();
});
