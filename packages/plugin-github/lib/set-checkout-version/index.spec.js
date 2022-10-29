'use strict';

const {createTest} = require('@putout/test');
const setCheckoutVersion = require('.');

const test = createTest(__dirname, {
    'github/set-checkout-version': setCheckoutVersion,
});

test('plugin-github: set checkout versions: report', (t) => {
    t.report('v2', 'Latest version of actions/checkout is missing');
    t.end();
});

test('plugin-github: set checkout versions: transform', (t) => {
    t.transform('checkout');
    t.end();
});

test('plugin-github: set checkout versions: transform: v2', (t) => {
    t.transform('v2');
    t.end();
});

test('plugin-github: set checkout versions: no report: latest', (t) => {
    t.noReport('latest');
    t.end();
});

test('plugin-github: set checkout versions: no report: no-uses', (t) => {
    t.noReport('no-uses');
    t.end();
});

