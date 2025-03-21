import {createTest} from '@putout/test';
import * as addArgs from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/add-test-args', addArgs],
    ],
});

test('plugin-putout: add-test-args: transform: compare-places', (t) => {
    t.transform('compare-places');
    t.end();
});

test('plugin-putout: add-test-args: process', (t) => {
    t.transform('process');
    t.end();
});

test('plugin-putout: add-test-args: no-process', (t) => {
    t.transform('no-process');
    t.end();
});

test('plugin-putout: add-test-args: progress', (t) => {
    t.transform('progress');
    t.end();
});

test('plugin-putout: add-test-args: no transform: has-binding', (t) => {
    t.noTransform('has-binding');
    t.end();
});

test('plugin-putout: add-test-args: no transform: not-test', (t) => {
    t.noTransform('not-test');
    t.end();
});
