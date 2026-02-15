import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['sort-ignore', plugin],
    ],
});

test('putout-config: sort-ignore: report', (t) => {
    t.report('sort-ignore', `Sort 'ignore' section of '.putout.json'`);
    t.end();
});

test('putout-config: sort-ignore: transform', (t) => {
    t.transform('sort-ignore');
    t.end();
});
