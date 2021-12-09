'use strict';

const convertTemplateToString = require('..');

const test = require('@putout/test')(__dirname, {
    'convert-template-to-string': convertTemplateToString,
});

test('plugin-template-to-string: report', (t) => {
    t.report('template', 'Template string with only one expression should not be used');
    t.end();
});

test('plugin-template-to-string: transform', (t) => {
    t.transform('template');
    t.end();
});

