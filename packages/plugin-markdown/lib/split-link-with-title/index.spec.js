import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['split-link-with-title', plugin],
    ],
});

test('markdown: split-link-with-title: report', (t) => {
    t.report('split-link-with-title', `Split link with title`);
    t.end();
});

test('markdown: split-link-with-title: transform', (t) => {
    t.transform('split-link-with-title');
    t.end();
});
