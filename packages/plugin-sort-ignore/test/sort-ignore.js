import {createTest} from '@putout/test';
import * as plugin from '../lib/sort-ignore.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['sort-ignore', plugin],
    ],
});

test('putout: sort-ignore: report', (t) => {
    t.report('sort-ignore', `Sort 'ignore'`);
    t.end();
});

test('putout: sort-ignore: transform', (t) => {
    t.transform('sort-ignore');
    t.end();
});

test('putout: sort-ignore: transform: no-hidden', (t) => {
    t.transform('no-hidden');
    t.end();
});

test('putout: sort-ignore: no report after transform: no-hidden', (t) => {
    t.noReportAfterTransform('sort-ignore');
    t.end();
});
