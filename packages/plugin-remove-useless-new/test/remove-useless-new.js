'use strict';

const {createTest} = require('@putout/test');
const removeUselessNew = require('..');

const test = createTest(__dirname, {
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

