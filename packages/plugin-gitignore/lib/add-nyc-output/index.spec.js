'use strict';

const test = require('@putout/test')(__dirname, {
    'gitignore/add-nyc-output': require('.'),
});

test('plugin-gitignore: add-nyc-output: report', (t) => {
    t.report('gitignore', '".nyc_output" should be added to .gitignore');
});

test('plugin-gitignore: transform', (t) => {
    t.transform('gitignore');
    t.end();
});

test('plugin-gitignore: no transform: present', (t) => {
    t.noTransform('present');
    t.end();
});

