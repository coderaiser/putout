'use strict';

const test = require('@putout/test')(__dirname, {
    gitignore: require('..'),
});

test('plugin-gitignore: report', (t) => {
    t.report('gitignore', '.putoutcache should be added to .gitignore');
});

test('plugin-gitignore: transform', (t) => {
    t.transform('gitignore');
    t.end();
});

test('plugin-gitignore: no transform: present', (t) => {
    t.noTransform('present');
    t.end();
});

