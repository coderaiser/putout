import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-trailing-whitespaces-from-heading', plugin],
    ],
});

test('markdown: remove-trailing-whitespaces-from-heading: report', (t) => {
    t.report('remove-trailing-whitespaces-from-heading', `Avoid trailing whitespaces`);
    t.end();
});

test('markdown: remove-trailing-whitespaces-from-heading: transform', (t) => {
    t.transform('remove-trailing-whitespaces-from-heading');
    t.end();
});

test('markdown: remove-trailing-whitespaces-from-heading: no report: not-string', (t) => {
    t.noReport('not-string');
    t.end();
});
