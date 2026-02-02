import {createTest} from '@putout/test';
import * as setLintDot from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['set-lint-dot', setLintDot],
    ],
});

test('madrun: set lint dot: report: lint', (t) => {
    t.report('lint', `Use 'lint' to check current directory`);
    t.end();
});

test('madrun: set lint dot: transform: lint', (t) => {
    t.transform('lint');
    t.end();
});

test('madrun: set lint dot: transform: lint-template', (t) => {
    t.transform('lint-template');
    t.end();
});

test('madrun: set lint dot: transform: template: template-variables', (t) => {
    t.transform('template-variables');
    t.end();
});

test('madrun: set lint dot: transform: esm', (t) => {
    t.transform('esm');
    t.end();
});

test('madrun: set lint dot: no transform: lint-fn', (t) => {
    t.noTransform('lint-fn');
    t.end();
});

test('madrun: set lint dot: no transform: no-lint', (t) => {
    t.noTransform('no-lint');
    t.end();
});
