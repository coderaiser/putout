'use strict';

const removeConsole = require('./fixture/remove-console');
const test = require('..')(__dirname, {
    'remove-console': removeConsole,
});

const formatter = require('@putout/formatter-dump');

test('test: format', (t) => {
    t.format(formatter, 'var');
    t.end();
});

test('test: no format', (t) => {
    t.noFormat(formatter, 'declared');
    t.end();
});

test('test: formatMany', (t) => {
    t.formatMany(formatter, ['var', 'var']);
    t.end();
});

