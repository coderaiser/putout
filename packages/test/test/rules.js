'use strict';

const removeConsole = require('./fixture/remove-console');
const test = require('..')(__dirname, {
    'react-hooks': {
        rules: {
            'remove-console': removeConsole,
        },
    },
});

test('test: rules: reportCode', (t) => {
    t.reportCode('console.log()', `Avoid 'console' call`);
    t.end();
});

test('test: rules: transformCode', (t) => {
    t.transformCode('console.log()', '');
    t.end();
});

