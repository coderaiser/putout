'use strict';

const removeUselessTemplates = require('..');

const test = require('@putout/test')(__dirname, {
    'remove-useless-templates': removeUselessTemplates,
});

test('plugin-remove-useless-templates: report', (t) => {
    t.report('template', 'Template string with only one variable should not be used');
    t.end();
});

test('plugin-remove-useless-templates: transform', (t) => {
    t.transform('template');
    t.end();
});

