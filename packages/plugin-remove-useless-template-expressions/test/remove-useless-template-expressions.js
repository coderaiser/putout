import {createTest} from '@putout/test';
import * as removeUselessTemplateExpressions from '../lib/remove-useless-template-expressions.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-template-expressions', removeUselessTemplateExpressions],
    ],
});

test('plugin-remove-useless-template-expressions: report: literal', (t) => {
    t.report('literal', 'Avoid useless template expressions');
    t.end();
});

test('plugin-remove-useless-template-expressions: transform: literal', (t) => {
    t.transform('literal');
    t.end();
});

test('plugin-remove-useless-template-expressions: transform: var', (t) => {
    t.transform('var');
    t.end();
});

test('plugin-remove-useless-template-expressions: no transform: var: var-only', (t) => {
    t.noTransform('var-only');
    t.end();
});

test('plugin-remove-useless-template-expressions: no transform: comments', (t) => {
    t.noTransform('comments');
    t.end();
});

test('plugin-remove-useless-template-expressions: no transform: contains-quasis', (t) => {
    t.noTransform('contains-quasis');
    t.end();
});
