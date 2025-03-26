import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['rename-referenced-file', plugin],
    ],
});

test('packages: rename-referenced-file: no report: rename-referenced-file-no-options', (t) => {
    t.noReport('rename-referenced-file-no-options');
    t.end();
});

test('packages: rename-referenced-file: report', (t) => {
    t.reportWithOptions('rename-referenced-file', `Rename 'hello.js' to 'world.js'`, {
        from: 'hello.js',
        to: 'world.js',
    });
    t.end();
});

test('packages: rename-referenced-file: transform', (t) => {
    t.transformWithOptions('rename-referenced-file', {
        from: 'hello.js',
        to: 'world.js',
    });
    t.end();
});
