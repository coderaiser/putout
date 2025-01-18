'use strict';

const {createTest} = require('@putout/test');
const removeUselessMappedTypes = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['remove-useless-mapped-types', removeUselessMappedTypes],
    ],
});

test('plugin-remove-useless-mapped-types: report: mapped-types', (t) => {
    t.report('mapped-types', 'Avoid useless mapped types');
    t.end();
});

test('plugin-remove-useless-mapped-types: transform: mapped-types', (t) => {
    t.transform('mapped-types');
    t.end();
});
