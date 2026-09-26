import {createTest} from '@putout/test';
import * as markdown from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'apply-ts-codeblock-in-file': 'on',
    },
    plugins: [
        ['markdown', markdown],
    ],
});

test('plugin-markdown: transform: apply-ts-codeblock-in-file-on', (t) => {
    t.transform('apply-ts-codeblock-in-file-on');
    t.end();
});
