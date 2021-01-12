'use strict';

const json = require('..');

const test = require('@putout/test')(__dirname, {
    'remove-unused-variables': require('@putout/plugin-remove-unused-variables'),
});

test('formatter: json', (t) => {
    t.format(json, 'var');
    t.end();
});

test('formatter: json: no', (t) => {
    t.format(json, 'no');
    t.end();
});

test('formatter: json: many', (t) => {
    t.formatMany(json, ['var', 'var']);
    t.end();
});

