'use strict';

const esm = require('@putout/plugin-esm');

const test = require('..')(__dirname, {
    'esm/remove-empty-import': esm.rules['remove-empty-import'],
});

test('test: options', (t) => {
    t.transformWithOptions('transform-options', {
        ignore: ['hello'],
    });
    t.end();
});

test('test: options: no transform', (t) => {
    t.noTransformWithOptions('no-transform-options', {
        ignore: [
            'hello',
            'world',
        ],
    });
    t.end();
});
