'use strict';

const test = require('@putout/test')(__dirname, {
    npmignore: require('..'),
});

test('plugin-npmignore: report', (t) => {
    t.report('npmignore', '.* should be added to .npmignore');
});

test('plugin-npmignore: transform', (t) => {
    t.transform('npmignore');
    t.end();
});

test('plugin-npmignore: no transform: present', (t) => {
    t.noTransform('present');
    t.end();
});

