'use strict';

const dump = require('..');

const test = require('@putout/test')(__dirname, {
    'remove-unused-variables': require('@putout/plugin-remove-unused-variables'),
});

test('formatter: dump', (t) => {
    t.format(dump, 'var');
    t.end();
});

test('formatter: dump: no', (t) => {
    t.noFormat(dump, 'no');
    t.end();
});

test('formatter: dump: many', (t) => {
    t.formatMany(dump, ['var', 'var']);
    t.end();
});

