'use strict';

const variables = require('@putout/plugin-variables');
const removeConsole = require('./fixture/remove-console');

const {createTest} = require('..');
const removeUnused = variables.rules['remove-unused'];

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
