'use strict';

const setCheckoutVersion = require('.');

const test = require('@putout/test')(__dirname, {
    'github/set-checkout-version': setCheckoutVersion,
});

test('plugin-github: set checkout versions: report', (t) => {
    t.report('checkout', 'Latest version of actions/checkout is missing');
    t.end();
});

test('plugin-github: set checkout versions: transform', (t) => {
    t.transform('checkout');
    t.end();
});

test('plugin-github: set checkout versions: no transform: no version', (t) => {
    t.noReport('latest');
    t.end();
});

