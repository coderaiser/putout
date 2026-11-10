import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['printer/apply-computed-print', plugin],
    ],
});

test('plugin-printer: apply-computed-print: report', (t) => {
    t.report('apply-computed-print', `Use print('__path') instead of path.get(__path)`);
    t.end();
});

test('plugin-printer: apply-computed-print: transform', (t) => {
    t.transform('apply-computed-print');
    t.end();
});

test('plugin-printer: apply-computed-print: no transform: apply-computed-print-putout-print', (t) => {
    t.noTransform('apply-computed-print-putout-print');
    t.end();
});

test('plugin-printer: apply-computed-print: no transform: apply-computed-print-no-binding', (t) => {
    t.noTransform('apply-computed-print-no-binding');
    t.end();
});
