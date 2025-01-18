'use strict';

const {createTest} = require('@putout/test');
const removeEmpty = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['putout-config/remove-empty', removeEmpty],
    ],
});

test('plugin-putout-config: remove-empty: report: empty', (t) => {
    t.report('empty', 'Avoid empty property values');
    t.end();
});

test('plugin-putout-config: remove-empty: transform: empty', (t) => {
    t.transform('empty');
    t.end();
});

test('plugin-putout-config: remove-empty: no transform: plugin-options', (t) => {
    t.noTransform('plugin-options');
    t.end();
});
