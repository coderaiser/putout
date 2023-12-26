import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['find-file', plugin],
    ],
});

test('packages: find-file: report', (t) => {
    t.report('find-file', `Find 'package.json'`);
    t.end();
});

test('packages: find-file: transform', (t) => {
    t.transform('find-file');
    t.end();
});
