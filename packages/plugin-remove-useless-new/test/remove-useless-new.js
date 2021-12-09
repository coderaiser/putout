'use strict';

const removeUselessNew = require('..');

const test = require('@putout/test')(__dirname, {
    'remove-useless-new': removeUselessNew,
});

test('plugin-remove-useless-new: report', (t) => {
    t.report('new', `Avoid useless operator 'new'`);
    t.end();
});

test('plugin-remove-useless-new: transform', (t) => {
    t.transform('new');
    t.end();
});

