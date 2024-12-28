'use strict';

const {createTest} = require('@putout/test');
const jest = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['tape/jest', jest],
    ],
});

test('plugin-tape: jest: report', (t) => {
    t.report('jest', `Use 📼 Supertape instead of 🃏Jest`);
    t.end();
});

test('plugin-tape: jest: transform', (t) => {
    t.transform('jest');
    t.end();
});
