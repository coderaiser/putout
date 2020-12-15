'use strict';

const progress = require('..');

const test = require('@putout/test')(__dirname, {
    'remove-unused-variables': require('@putout/plugin-remove-unused-variables'),
});

test('formatter: frame', (t) => {
    t.format(progress, 'var');
    t.end();
});

test('formatter: frame: no', (t) => {
    t.format(progress, 'no');
    t.end();
});

test('formatter: frame: many', (t) => {
    t.formatMany(progress, ['var', 'var']);
    t.end();
});

