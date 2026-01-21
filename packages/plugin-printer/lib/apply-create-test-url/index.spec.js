import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-create-test-url', plugin],
    ],
});

test('printer: apply-create-test-url: report', (t) => {
    t.report('apply-create-test-url', `Use 'import.meta.url' instead of '__dirname'`);
    t.end();
});

test('printer: apply-create-test-url: transform', (t) => {
    t.transform('apply-create-test-url');
    t.end();
});

test('printer: apply-create-test-url: transform: order', (t) => {
    t.transform('order');
    t.end();
});

test('printer: apply-create-test-url: no report: commonjs', (t) => {
    t.noReport('commonjs');
    t.end();
});
