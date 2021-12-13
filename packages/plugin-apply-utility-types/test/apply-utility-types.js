'use strict';

const {createTest} = require('@putout/test');
const applyUtilityTypes = require('..');

const test = createTest(__dirname, {
    'apply-utility-types': applyUtilityTypes,
});

test('plugin-apply-utility-types: transform: report: mapped-types', (t) => {
    t.report('mapped-types', 'Utility types should be applied');
    t.end();
});

test('plugin-apply-utility-types: transform: mapped-types', (t) => {
    t.transform('mapped-types');
    t.end();
});

