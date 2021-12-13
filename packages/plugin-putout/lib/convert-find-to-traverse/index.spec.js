'use strict';

const {createTest} = require('@putout/test');
const convertFindToTraverse = require('.');

const test = createTest(__dirname, {
    'convert-find-to-traverse': convertFindToTraverse,
});

test('plugin-putout: convert find to traverse: report', (t) => {
    t.report('find', `"traverse" should be used instead of "find"`);
    t.end();
});

test('plugin-putout: convert find to traverse: transform', (t) => {
    t.transform('find');
    t.end();
});

test('plugin-putout: convert find to traverse: transform: assign', (t) => {
    t.noTransform('assign');
    t.end();
});

test('plugin-putout: convert find to traverse: no transform: return', (t) => {
    t.noTransform('return');
    t.end();
});

test('plugin-putout: convert find to traverse: no transform: for-of', (t) => {
    t.noTransform('for-of');
    t.end();
});

test('plugin-putout: convert find to traverse: no transform: find: one arg', (t) => {
    t.noTransform('find-one-arg');
    t.end();
});
