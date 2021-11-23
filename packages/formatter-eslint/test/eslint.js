'use strict';

const eslint = require('..');

const test = require('@putout/test')(__dirname, {
    'remove-unused-variables': require('@putout/plugin-remove-unused-variables'),
});

test('formatter: eslint', (t) => {
    t.format(eslint, 'var');
    t.end();
});

test('formatter: eslint: eslint-formatter', (t) => {
    process.env.ESLINT_FORMATTER = 'compassion';
    
    t.format(eslint, 'eslint-formatter');
    delete process.env.ESLINT_FORMATTER;
    t.end();
});

test('formatter: eslint: no', (t) => {
    t.noFormat(eslint, 'no');
    t.end();
});

test('formatter: eslint: many', (t) => {
    t.formatMany(eslint, ['var', 'var']);
    t.end();
});

