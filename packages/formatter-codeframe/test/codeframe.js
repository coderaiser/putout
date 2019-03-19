'use strict';

const codeframe = require('..');

const test = require('@putout/test')(__dirname, {
    'remove-unused-variables': require('@putout/plugin-remove-unused-variables'),
});

test('formatter: codeframe', (t) => {
    t.format(codeframe, 'var');
    t.end();
});

test('formatter: codeframe: no', (t) => {
    t.noFormat(codeframe, 'no');
    t.end();
});

test('formatter: codeframe: many', (t) => {
    t.formatMany(codeframe, ['var', 'var']);
    t.end();
});

