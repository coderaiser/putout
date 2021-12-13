'use strict';

const {createTest} = require('@putout/test');
const applyAsTypeAssertions = require('..');

const test = createTest(__dirname, {
    'apply-as-type-assertions': applyAsTypeAssertions,
});

test('plugin-apply-as-type-assertiong: transform: report', (t) => {
    t.report('assertion', '"as" should be used for type assertions');
    t.end();
});

test('plugin-apply-as-type-assertiong: transform: object', (t) => {
    t.transform('assertion');
    t.end();
});

