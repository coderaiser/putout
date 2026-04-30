import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-url-parse-to-new-url', plugin],
    ],
});

test('nodejs: convert-url-parse-to-new-url: report', (t) => {
    t.report('convert-url-parse-to-new-url', `Use 'new URL()' instead of 'url.parse()'`);
    t.end();
});

test('nodejs: convert-url-parse-to-new-url: transform', (t) => {
    t.transform('convert-url-parse-to-new-url');
    t.end();
});
