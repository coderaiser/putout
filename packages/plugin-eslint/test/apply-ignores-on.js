'use strict';

const {createTest} = require('@putout/test');
const eslint = require('../lib/index.js');

const test = createTest(__dirname, {
    rules: {
        'eslint/apply-ignores': 'on',
    },
    plugins: [
        ['eslint', eslint],
    ],
});

test('plugin-eslint: transform: apply-ignores-on', (t) => {
    t.transform('apply-ignores-on');
    t.end();
});
