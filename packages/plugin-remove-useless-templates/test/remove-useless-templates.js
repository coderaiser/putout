'use strict';

const {createTest} = require('@putout/test');
const removeUselessTemplates = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['remove-useless-templates', removeUselessTemplates],
    ],
});

test('plugin-remove-useless-templates: report: template', (t) => {
    t.report('template', 'Template string with only one variable should not be used');
    t.end();
});

test('plugin-remove-useless-templates: transform: template', (t) => {
    t.transform('template');
    t.end();
});
