'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-useless-async': require('..'),
});

test('plugin-remove-useless-async: report', (t) => {
    t.report('async', 'Useless async should be avoided');
    t.end();
});

test('plugin-remove-useless-async: transform', (t) => {
    t.transform('async');
    t.end();
});

test('plugin-remove-useless-async: transform: function', (t) => {
    t.transform('function');
    t.end();
});

test('plugin-remove-useless-async: no transform: return', (t) => {
    t.noTransform('return');
    t.end();
});

test('plugin-remove-useless-async: no transform: throw', (t) => {
    t.noTransform('throw');
    t.end();
});

test('plugin-remove-useless-async: no transform: await', (t) => {
    t.noTransform('await');
    t.end();
});

