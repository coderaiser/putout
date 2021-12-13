'use strict';

const {createTest} = require('@putout/test');
const npmignore = require('..');

const test = createTest(__dirname, {
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
