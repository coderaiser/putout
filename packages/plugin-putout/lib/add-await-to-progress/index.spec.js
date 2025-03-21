import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-await-to-progress', plugin],
    ],
});

test('packages: add-await-to-progress: report: add-await-to-progress', (t) => {
    t.report('add-await-to-progress', `Add 'await' to operator 'progress()'`);
    t.end();
});

test('packages: add-await-to-progress: transform: add-await-to-progress', (t) => {
    t.transform('add-await-to-progress');
    t.end();
});

test('packages: add-await-to-progress: transform: tape', (t) => {
    t.transform('tape');
    t.end();
});

test('packages: add-await-to-progress: no transform: not-test', (t) => {
    t.noTransform('not-test');
    t.end();
});
