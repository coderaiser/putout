import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['merge-heading-spaces', plugin],
    ],
});

test('markdown: merge-heading-spaces: report', (t) => {
    t.report('merge-heading-spaces', `Merge heading spaces`);
    t.end();
});

test('markdown: merge-heading-spaces: transform', (t) => {
    t.transform('merge-heading-spaces');
    t.end();
});

test('markdown: merge-heading-spaces: no report: not-string', (t) => {
    t.noReport('not-string');
    t.end();
});
