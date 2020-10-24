'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-useless-type-convertion': require('..'),
});

test('plugin-remove-useless-type-convertion: report', (t) => {
    t.report('bool', 'Useless type convertion should be avoided');
    t.end();
});

test('plugin-remove-useless-type-convertion: transform', (t) => {
    t.transform('bool');
    t.end();
});

test('plugin-remove-useless-type-convertion: transform: typeof', (t) => {
    t.transform('typeof');
    t.end();
});

