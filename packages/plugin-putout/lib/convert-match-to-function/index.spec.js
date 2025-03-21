import {createTest} from '@putout/test';
import * as convertReplaceToFunction from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/convert-match-to-function', convertReplaceToFunction],
    ],
});

test('plugin-putout: convert-match-to-function: report', (t) => {
    t.report('convert-match-to-function', `'match' should be a function`);
    t.end();
});

test('plugin-putout: convert-match-to-function: transform', (t) => {
    t.transform('convert-match-to-function');
    t.end();
});
