import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['rename-file', plugin],
    ],
});

test('packages: rename-file: report', (t) => {
    t.reportWithOptions('rename-file', `Rename 'README.md' to 'readme.md'`, {
        from: 'README.md',
        to: 'readme.md',
    });
    t.end();
});

test('packages: rename-file: no report: no-options', (t) => {
    t.noReport('no-options');
    t.end();
});

test('packages: rename-file: transform with options', (t) => {
    t.transformWithOptions('rename-file', {
        from: 'README.md',
        to: 'readme.md',
    });
    t.end();
});

test('packages: rename-file: transform with options: mask', (t) => {
    t.transformWithOptions('mask', {
        mask: '*.test.*',
        from: 'test',
        to: 'spec',
    });
    t.end();
});
