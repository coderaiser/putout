'use strict';

const {createTest} = require('@putout/test');
const plugin = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['parens', plugin],
    ],
});

test('putout: parens: transform: add-missing-for-template', (t) => {
    t.transform('add-missing-for-template');
    t.end();
});

test('putout: parens: transform: add-missing-for-await', (t) => {
    t.transform('add-missing-for-await');
    t.end();
});
