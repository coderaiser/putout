'use strict';

const {createTest} = require('@putout/test');
const removeDuplicatesFromLogicalExpressions = require('..');

const test = createTest(__dirname, {
    'remove-duplicates-from-logical-expressions': removeDuplicatesFromLogicalExpressions,
});

test('plugin-remove-duplicates-from-logical-expressions: report', (t) => {
    t.report('logical', 'Duplicates should be avoided in logical expressions');
    t.end();
});

test('plugin-remove-duplicates-from-logical-expressions: transform: logical', (t) => {
    t.transform('logical');
    t.end();
});

