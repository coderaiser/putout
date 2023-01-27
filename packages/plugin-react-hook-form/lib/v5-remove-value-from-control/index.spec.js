'use strict';

const {createTest} = require('@putout/test');
const removeValueFromControl = require('.');

const test = createTest(__dirname, {
    'remove-value-from-control': removeValueFromControl,
});

test('plugin-nextjs: remove-value-from-control: report', (t) => {
    t.report('remove-value-from-control', `Remove 'value property' from 'control' attribute`);
    t.end();
});

test('plugin-nextjs: remove-value-from-control: transform', (t) => {
    t.transform('remove-value-from-control');
    t.end();
});

