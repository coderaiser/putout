import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['sort-contents', plugin],
    ],
});

test('lib: sort-contents: report', (t) => {
    t.report('sort-contents', `Sort 'contents'`);
    t.end();
});

test('lib: sort-contents: transform', (t) => {
    t.transform('sort-contents');
    t.end();
});
