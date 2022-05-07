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

test('plugin-remove-useless-new: transform: regexp', (t) => {
    t.transform('regexp');
    t.end();
});

test('plugin-remove-useless-new: transform: object', (t) => {
    t.transform('object');
    t.end();
});

test('plugin-remove-useless-new: transform: new-new', (t) => {
    t.transform('new-new');
    t.end();
});

test('plugin-remove-useless-new: transform: big-int', (t) => {
    t.transform('big-int');
    t.end();
});

