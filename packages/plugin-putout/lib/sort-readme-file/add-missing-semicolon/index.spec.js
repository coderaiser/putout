import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-missing-semicolon', plugin],
    ],
});

test('lib: add-missing-semicolon: report', (t) => {
    t.report('add-missing-semicolon', `Add missing semicolon`);
    t.end();
});

test('lib: add-missing-semicolon: transform', (t) => {
    t.transform('add-missing-semicolon');
    t.end();
});
