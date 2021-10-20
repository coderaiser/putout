'use strict';

const test = require('@putout/test')(__dirname, {
    github: require('..'),
});

test('plugin-github: transform', (t) => {
    t.transform('github');
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

