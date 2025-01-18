'use strict';

const {createTest} = require('@putout/test');
const jest = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['jest', jest],
    ],
});

test('plugin-jest: report: jest', (t) => {
    t.report('jest', 'Latest Jest API should be used');
    t.end();
});

test('plugin-jest: transform: jest', (t) => {
    t.transform('jest');
    t.end();
});
