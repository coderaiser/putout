'use strict';

const npmignore = require('..');

const test = require('@putout/test')(__dirname, {
    npmignore,
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
