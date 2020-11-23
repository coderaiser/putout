'use strict';

const madrun = require('@putout/plugin-madrun');
const addFixLint = madrun.rules['add-fix-lint'];

const test = require('@putout/test')(__dirname, {
    'remove-useless-escape': require('..'),
});

test('plugin-remove-useless-escape: report', (t) => {
    t.report('string', 'Unnecessary escape character');
    t.end();
});

test('plugin-remove-useless-escape: transform', (t) => {
    t.transform('string');
    t.end();
});

test('plugin-remove-useless-escape: transform: template', (t) => {
    t.transform('template');
    t.end();
});

test('plugin-remove-useless-escape: transform: a', (t) => {
    t.transform('a');
    t.end();
});

test('plugin-remove-useless-escape: no transform: slash', (t) => {
    t.noTransform('slash');
    t.end();
});

test('plugin-remove-useless-escape: transform: quote', (t) => {
    t.transform('quote');
    t.end();
});

test('plugin-remove-useless-escape: no transform: no raw', (t) => {
    t.transform('no-raw', {
        addFixLint,
    });
    
    t.end();
});

