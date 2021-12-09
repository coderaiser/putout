'use strict';

const convertToNoTransformCode = require('.');

const test = require('@putout/test')(__dirname, {
    'putout/convert-to-no-transform-code': convertToNoTransformCode,
});

test('plugin-putout: convert-to-no-transform-code: transform', (t) => {
    t.transform('no-transform-code');
    t.end();
});

test('plugin-putout: convert-to-no-transform-code: transform: not same', (t) => {
    t.noTransform('not-same');
    t.end();
});

test('plugin-putout: convert-to-no-transform-code: no transform: literal', (t) => {
    t.noTransform('literal');
    t.end();
});
