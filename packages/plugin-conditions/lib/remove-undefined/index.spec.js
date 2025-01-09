'use strict';

const {createTest} = require('@putout/test');
const removeBoolean = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['conditions/remove-undefined', removeBoolean],
    ],
});

test('plugin-conditions: remove-undefined: report', (t) => {
    t.report('remove-undefined', `Avoid 'undefined' in assertions`);
    t.end();
});

test('plugin-conditions: remove-undefined: transform', (t) => {
    t.transform('remove-undefined');
    t.end();
});
