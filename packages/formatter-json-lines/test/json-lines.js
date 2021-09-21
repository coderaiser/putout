'use strict';

const jsonLines = require('..');

const test = require('@putout/test')(__dirname, {
    'remove-unused-variables': require('@putout/plugin-remove-unused-variables'),
});

test('formatter: json-lines', (t) => {
    t.format(jsonLines, 'var');
    t.end();
});

test('formatter: json-lines: no', (t) => {
    t.format(jsonLines, 'no');
    t.end();
});

test('formatter: json-lines: many', (t) => {
    t.formatMany(jsonLines, ['var', 'var']);
    t.end();
});

