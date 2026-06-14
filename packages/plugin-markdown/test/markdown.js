import {createTest} from '@putout/test';
import * as markdown from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['markdown', markdown],
    ],
});

test('plugin-markdown: transform: merge-heading-spaces', (t) => {
    t.transform('merge-heading-spaces');
    t.end();
});

test('plugin-markdown: transform: split-link-with-title', (t) => {
    t.transform('split-link-with-title');
    t.end();
});

test('plugin-markdown: transform: remove-dependencies-status-badge', (t) => {
    t.transform('remove-dependencies-status-badge');
    t.end();
});
