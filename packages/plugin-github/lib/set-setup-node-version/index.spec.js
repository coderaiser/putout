'use strict';

const {createTest} = require('@putout/test');
const setSetupNodeVersion = require('.');

const test = createTest(__dirname, {
    'github/set-setup-node-version': setSetupNodeVersion,
});

test('plugin-github: set setup-node versions: report', (t) => {
    t.report('setup-node', 'Latest version of actions/setup-node is missing');
    t.end();
});

test('plugin-github: set setup-node versions: transform', (t) => {
    t.transform('setup-node');
    t.end();
});

test('plugin-github: set setup-node versions: no transform: no version', (t) => {
    t.noReport('latest');
    t.end();
});

