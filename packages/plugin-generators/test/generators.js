'use strict';

const {createTest} = require('@putout/test');
const generators = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['generators', generators],
    ],
});

test('plugin-generators: transform: convert-multiply-to-generator', (t) => {
    t.transform('convert-multiply-to-generator');
    t.end();
});

test('plugin-for-of: transform: add-missing-start', (t) => {
    t.transform('add-missing-star');
    t.end();
});
