'use strict';

const {createTest} = require('@putout/test');
const convertThrow = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['convert-throw', convertThrow],
    ],
});

test('plugin-convert-throw: report: throw', (t) => {
    t.report('throw', '"throw" should be used without body');
    t.end();
});

test('plugin-convert-throw: transform: throw', (t) => {
    t.transform('throw');
    t.end();
});
