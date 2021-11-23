'use strict';

const progress = require('..');

const test = require('@putout/test')(__dirname, {
    'remove-unused-variables': require('@putout/plugin-remove-unused-variables'),
});

test('formatter: progress', (t) => {
    t.format(progress, 'var');
    t.end();
});

test('formatter: progress: no', (t) => {
    t.format(progress, 'no');
    t.end();
});

test('formatter: progress: many', (t) => {
    t.formatMany(progress, ['var', 'var']);
    t.end();
});

test('formatter: progress: minCount', (t) => {
    t.format(progress, 'min-count', {
        minCount: 10,
    });
    t.end();
});

