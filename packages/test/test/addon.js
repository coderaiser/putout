'use strict';

const removeUnused = require('@putout/plugin-remove-unused-variables');
const removeConsole = require('./fixture/remove-console');

const {createTest} = require('..');

const test = createTest(__dirname, {
    plugins: {
        'remove-console': removeConsole,
    },
});

test('test: addon: transform', (t) => {
    t.transform('var', '\n', {
        'remove-unused-variable': removeUnused,
    });
    t.end();
});

