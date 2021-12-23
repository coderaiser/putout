'use strict';

const removeUnusedVariables = require('@putout/plugin-remove-unused-variables');

const {createTest} = require('@putout/test');
const convertForToForOf = require('./index.js');

const test = createTest(__dirname, {
    'convert-for-to-for-of/length': convertForToForOf,
});

test('plugin-convert-for-to-for-of: length: transform: remove-useless-arguments', (t) => {
    t.transform('remove-useless-arguments', {
        'remove-unused-variables': removeUnusedVariables,
    });
    t.end();
});
