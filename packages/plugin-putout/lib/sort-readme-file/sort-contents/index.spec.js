import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['sort-contents', plugin],
    ],
});

test('putout: plugin-putout: sort-readme-file: sort-contents: report', (t) => {
    t.report('sort-contents', `Sort 'contents'`);
    t.end();
});

test('putout: plugin-putout: sort-readme-file: sort-contents: transform', (t) => {
    t.transform('sort-contents');
    t.end();
});

test('putout: plugin-putout: sort-readme-file: sort-contents: no report: not-content', (t) => {
    t.noReport('not-content');
    t.end();
});
