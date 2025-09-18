import {createTest} from '@putout/test';
import * as renameEsilntToPutout from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['madrun/rename-esilnt-to-putout', renameEsilntToPutout],
    ],
});

test('madrun: rename-eslint-to-putout: report: eslint', (t) => {
    t.report('eslint', `Use "putout" instead of "eslint"`);
    t.end();
});

test('madrun: rename-eslint-to-putout: transform: eslint', (t) => {
    t.transform('eslint');
    t.end();
});

test('madrun: rename-eslint-to-putout: transform: template', (t) => {
    t.transform('template');
    t.end();
});

test('madrun: rename-eslint-to-putout: no transform: eslintrc', (t) => {
    t.noTransform('eslintrc');
    t.end();
});

test('madrun: rename-eslint-to-putout: no transform: not-lint', (t) => {
    t.noTransform('not-lint');
    t.end();
});

test('madrun: rename-eslint-to-putout: no transform: eslint-fix', (t) => {
    t.noTransform('eslint-fix');
    t.end();
});

test('madrun: rename-eslint-to-putout: no transform: not-str', (t) => {
    t.noTransform('not-str');
    t.end();
});
