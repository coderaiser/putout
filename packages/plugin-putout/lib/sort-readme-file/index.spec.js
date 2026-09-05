import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['sort-readme-file', plugin],
    ],
});

test('putout: sort-readme-file: report', (t) => {
    t.report('sort-readme-file', `Sort 'contents'`);
    t.end();
});

test('putout: sort-readme-file: transform', (t) => {
    t.transform('sort-readme-file');
    t.end();
});
