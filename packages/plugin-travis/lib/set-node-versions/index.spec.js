'use strict';

const test = require('@putout/test')(__dirname, {
    travis: require('..'),
});

test('plugin-travis: set node versions: report', (t) => {
    t.report('travis', 'Latest version of node is missing');
});

test('plugin-travis: set node versions: transform', (t) => {
    t.transform('travis');
    t.end();
});

test('plugin-travis: set node versions: no transform: no versions', (t) => {
    t.noTransform('no-versions');
    t.end();
});

