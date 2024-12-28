'use strict';

const {createTest} = require('@putout/test');
const applyUtilityTypes = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['apply-utility-types', applyUtilityTypes],
    ],
});

test('plugin-typescript: apply-utility-types: report: mapped-types', (t) => {
    t.report('mapped-types', 'Apply utility types');
    t.end();
});

test('plugin-apply-typescript: apply-utility-types: transform: mapped-types', (t) => {
    t.transform('mapped-types');
    t.end();
});
