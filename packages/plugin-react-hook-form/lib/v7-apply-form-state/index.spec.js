import {createTest} from '@putout/test';
import * as apply from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-form-state', apply],
    ],
});

test('plugin-nextjs: v7-apply-form-state: report', (t) => {
    t.report('v7-apply-form-state', `Use 'formState.errors' instead of 'errors'`);
    t.end();
});

test('plugin-nextjs: v7-apply-form-state: no report: no-use-form-context', (t) => {
    t.noReport('no-use-form-context');
    t.end();
});

test('plugin-nextjs: v7-apply-form-state: transform', (t) => {
    t.transform('v7-apply-form-state');
    t.end();
});

test('plugin-nextjs: v7-apply-form-state: transform: couple', (t) => {
    t.transform('couple');
    t.end();
});

test('plugin-nextjs: v7-apply-form-state: transform: rest', (t) => {
    t.transform('rest');
    t.end();
});

test('plugin-nextjs: v7-apply-form-state: no transform: form-state', (t) => {
    t.noTransform('form-state');
    t.end();
});

test('plugin-nextjs: v7-apply-form-state: no report: no-init', (t) => {
    t.noReport('no-init');
    t.end();
});
