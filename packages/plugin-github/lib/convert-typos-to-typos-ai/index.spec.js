import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-typos-to-typos-ai', plugin],
    ],
});

test('github: convert-typos-to-typos-ai: report', (t) => {
    t.report('convert-typos-to-typos-ai', `Use 'typos.ai' instead of 'typos'`);
    t.end();
});

test('github: convert-typos-to-typos-ai: transform', (t) => {
    t.transform('convert-typos-to-typos-ai');
    t.end();
});
