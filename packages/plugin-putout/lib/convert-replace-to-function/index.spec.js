import {createTest} from '@putout/test';
import * as convertReplaceToFunction from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/convert-replace-to-function', convertReplaceToFunction],
    ],
});

test('plugin-putout: convert-replace-to-function: report', (t) => {
    t.report('convert-replace-to-function', `'replace' should be a function`);
    t.end();
});

test('plugin-putout: convert-replace-to-function: transform', (t) => {
    t.transform('convert-replace-to-function');
    t.end();
});
