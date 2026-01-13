import {createTest} from '@putout/test';
import * as convertMockRequireToMockImport from './index.js';
import * as tape from '../index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-mock-require-to-mock-import', convertMockRequireToMockImport],
    ],
});

test('plugin-convert-mock-require-to-mock-import: report: mock-require', (t) => {
    t.report('mock-require', '"mockImport" should be used instead of "mockRequire"');
    t.end();
});

test('plugin-convert-mock-require-to-mock-import: transform: mock-require', (t) => {
    t.transform('mock-require');
    t.end();
});

test('plugin-convert-mock-require-to-mock-import: transform: no-stop-all', (t) => {
    t.transform('no-stop-all');
    t.end();
});

test('plugin-convert-mock-require-to-mock-import: transform: couple', (t) => {
    t.transform('couple', {
        tape,
    });
    t.end();
});
