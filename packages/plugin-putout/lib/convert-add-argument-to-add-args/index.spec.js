'use strict';

const {createTest} = require('@putout/test');
const convertAddArgumentToAddArgs = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['putout/convert-add-argument-to-add-args', convertAddArgumentToAddArgs],
    ],
});

test('plugin-putout: convert-add-argument-to-add-args: report: add-argument', (t) => {
    t.report('add-argument', 'Use addArgs instead of addArgument');
    t.end();
});

test('plugin-putout: convert-add-argument-to-add-args: transform: add-argument', (t) => {
    t.transform('add-argument');
    t.end();
});
