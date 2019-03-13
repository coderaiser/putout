'use strict';

const stream = require('..');

const test = require('@putout/test')(__dirname, {
    'remove-unused-variables': require('@putout/plugin-remove-unused-variables'),
});

test('formatter: stream', (t) => {
    t.format(stream, 'var');
    t.end();
});

test('formatter: stream: no', (t) => {
    t.noFormat(stream, 'no');
    t.end();
});

test('formatter: stream: many', (t) => {
    t.formatMany(stream, ['var', 'var']);
    t.end();
});

