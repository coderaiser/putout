import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-get-file-content-to-read-file-content', plugin],
    ],
});

test('putout: convert-get-file-content-to-read-file-content: report', (t) => {
    t.report('convert-get-file-content-to-read-file-content', `To read file content use 'readFileContent' instead of 'getFileContent'`);
    t.end();
});

test('putout: convert-get-file-content-to-read-file-content: transform', (t) => {
    t.transform('convert-get-file-content-to-read-file-content');
    t.end();
});
