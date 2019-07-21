'use strict';

const test = require('@putout/test')(__dirname, {
    test: require('.'),
});

test('plugin-putout: convert-babel-types: report', (t) => {
    t.report('types', '"putout.types" should be used instead of "@babel/types"');
    t.end();
});

test('plugin-putout: convert-babel-types: transform', (t) => {
    t.transform('types');
    t.end();
});

test('plugin-putout: convert-babel-types: no transform', (t) => {
    t.noTransform('no-types');
    t.end();
});
