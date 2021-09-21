'use strict';

const test = require('@putout/test')(__dirname, {
    npmignore: require('..'),
});

test('plugin-npmignore: transform', (t) => {
    t.transform('npmignore');
    t.end();
});

test('plugin-npmignore: transform', (t) => {
    t.transform('npmignore');
    t.end();
});

test('plugin-npmignore: transform: options', (t) => {
    t.transformWithOptions('options', {
        dismiss: [
            'coverage',
        ],
    });
    t.end();
});
