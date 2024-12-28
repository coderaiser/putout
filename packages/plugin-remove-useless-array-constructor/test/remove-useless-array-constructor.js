'use strict';

const {createTest} = require('@putout/test');
const removeUselessArrayConstructor = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['remove-useless-array-constructor', removeUselessArrayConstructor],
    ],
});

test('plugin-remove-useless-array-constructor: report', (t) => {
    t.report('array', `Avoid array constructor, use '[]' instead`);
    t.end();
});

test('plugin-remove-useless-array-constructor: transform', (t) => {
    t.transform('array');
    t.end();
});

test('plugin-remove-useless-array-constructor: transform: of', (t) => {
    t.transform('of');
    t.end();
});
