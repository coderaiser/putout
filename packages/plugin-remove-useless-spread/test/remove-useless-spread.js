'use strict';

const test = require('@putout/test')(__dirname, {
    'remove-useless-spread': require('..'),
});

test('plugin-remove-useless-spread: report', (t) => {
    t.report('spread', 'Useless spread should be avoided');
    t.end();
});

test('plugin-remove-useless-spread: transform', (t) => {
    t.transform('spread');
    t.end();
});

test('plugin-remove-useless-spread: no transform: elements', (t) => {
    t.noTransform('elements');
    t.end();
});

