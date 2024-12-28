'use strict';

const {createTest} = require('@putout/test');
const removeNodeVersions = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['browserlist/remove-node-versions', removeNodeVersions],
    ],
});

test('plugin-browserlist: remove-node-versions: report', (t) => {
    t.report('browserlist', 'remove node from .browserlist');
    t.end();
});

test('plugin-browserlist: remove-node-versions: transform', (t) => {
    t.transform('browserlist');
    t.end();
});

test('plugin-browserlist: no transform: absent', (t) => {
    t.noTransform('absent');
    t.end();
});

test('plugin-browserlist: no transform: no browser', (t) => {
    t.noTransform('no-browser');
    t.end();
});
