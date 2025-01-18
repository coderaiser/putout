'use strict';

const {createTest} = require('@putout/test');
const convertTemplateToString = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['convert-template-to-string', convertTemplateToString],
    ],
});

test('plugin-template-to-string: report: template', (t) => {
    t.report('template', 'Avoid using Template string with only one expression');
    t.end();
});

test('plugin-template-to-string: transform: template', (t) => {
    t.transform('template');
    t.end();
});

test('plugin-template-to-string: no transform: couple', (t) => {
    t.noTransform('couple');
    t.end();
});

test('plugin-template-to-string: no transform: tag', (t) => {
    t.noTransform('tag');
    t.end();
});
