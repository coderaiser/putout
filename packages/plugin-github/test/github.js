'use strict';

const {createTest} = require('@putout/test');
const github = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['github', github],
    ],
});

test('plugin-github: transform: set-node-version', (t) => {
    t.transform('set-node-version');
    t.end();
});

test('plugin-github: transform: set-checkout-version', (t) => {
    t.transform('set-checkout-version');
    t.end();
});

test('plugin-github: transform: set-coveralls-version', (t) => {
    t.transform('set-coveralls-version');
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

test('plugin-github: transform: add-continue-on-error-to-coveralls', (t) => {
    t.transform('add-continue-on-error-to-coveralls');
    t.end();
});

test('plugin-github: transform: add-continue-on-error-to-add-and-commit', (t) => {
    t.transform('add-continue-on-error-to-add-and-commit');
    t.end();
});

test('plugin-github: transform: install-bun', (t) => {
    t.transform('install-bun');
    t.end();
});
