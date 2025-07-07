import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['move-referenced-file', plugin],
    ],
});

test('putout: plugin-filesystem: move-referenced-file: report', (t) => {
    t.reportWithOptions('move-referenced-file', `Move '/src/hello.js' to '/lib/hello.js'`, {
        name: '/src/hello.js',
        directory: 'lib',
    });
    t.end();
});

test('putout: plugin-filesystem: move-referenced-file: transform with options: long path', (t) => {
    t.transformWithOptions('move-referenced-file', {
        name: '/src/hello.js',
        directory: 'lib',
    });
    t.end();
});

test('putout: plugin-filesystem: move-referenced-file: transform', (t) => {
    t.noReportAfterTransformWithOptions('move-referenced-file', {
        name: 'hello.js',
        directory: 'lib',
    });
    t.end();
});

test('putout: plugin-filesystem: move-referenced-file: no transform: no-name', (t) => {
    t.noTransform('no-name');
    t.end();
});
