import {createTest} from '@putout/test';
import * as convertFsPromises from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['nodejs/convert-fs-promises', convertFsPromises],
    ],
});

test('nodejs: convert-fs-promises: report: fs', (t) => {
    t.report('fs', '"fs/promises" should be used instead of "fs.promises"');
    t.end();
});

test('nodejs: convert-fs-promises: transform: fs', (t) => {
    t.transform('fs');
    t.end();
});
