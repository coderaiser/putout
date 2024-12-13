'use strict';

const {createTest} = require('@putout/test');
const plugin = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['convert-optional-to-logical', plugin],
    ],
});

test('plugin-convert-optional-to-logical: no report: call-disabled', (t) => {
    t.noReport('call-disabled');
    t.end();
});

test('plugin-convert-optional-to-logical: transform: assign', (t) => {
    t.transform('assign');
    t.end();
});
