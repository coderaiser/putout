'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-useless-await': require('..'),
});

test('plugin-remove-useless-spread: report', (t) => {
    t.report('await-await', 'Useless await should be avoided');
    t.end();
});

test('plugin-remove-useless-spread: transform', (t) => {
    t.transform('await-await');
    t.end();
});

