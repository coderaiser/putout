'use strict';

const {createTest} = require('@putout/test');
const applyIsArray = require('.');

const test = createTest(__dirname, {
    'apply-is-array': applyIsArray,
});

test('plugin-apply-is-array: transform: report', (t) => {
    t.report('instanceof', `Use 'Array.isArray()' instead of 'instanceof'`);
    t.end();
});

test('plugin-apply-is-array: transform: instanceof', (t) => {
    t.transform('instanceof');
    t.end();
});

test('plugin-apply-is-array: transform: inline', (t) => {
    t.transformWithOptions('inline', {
        inline: true,
    });
    t.end();
});

