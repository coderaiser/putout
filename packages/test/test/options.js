'use strict';

const removeEmpty = require('@putout/plugin-remove-empty');

const test = require('..')(__dirname, {
    'remove-empty/import': removeEmpty.rules.import,
});

test('test: options', (t) => {
    t.transformWithOptions('transform-options', {
        ignore: [
            'hello',
        ],
    });
    t.end();
});

test('test: options: no transform', (t) => {
    t.noTransformWithOptions('transform-options', {
        ignore: [
            'hello',
            'world',
        ],
    });
    t.end();
});
