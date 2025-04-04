import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-track-file', plugin],
    ],
});

test('packages: add-track-file: report: add-track-file', (t) => {
    t.report('add-track-file', `Argument 'trackFile' is missing`);
    t.end();
});

test('packages: add-track-file: transform: add-track-file', (t) => {
    t.transform('add-track-file');
    t.end();
});

test('packages: add-track-file: transform: one-arg', (t) => {
    t.transform('one-arg');
    t.end();
});
