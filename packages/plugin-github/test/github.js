'use strict';

const {createTest} = require('@putout/test');
const github = require('..');

const test = createTest(__dirname, {
    github,
});

test('plugin-github: transform: set-node-version', (t) => {
    t.transform('set-node-version');
    t.end();
});

test('plugin-github: transform: set-checkout-version', (t) => {
    t.transform('set-checkout-version');
    t.end();
});

test('plugin-github: transform: set-setup-node-version', (t) => {
    t.transform('set-setup-node-version');
    t.end();
});

test('plugin-github: transform: set-add-and-commit', (t) => {
    t.transform('set-add-and-commit');
    t.end();
});
