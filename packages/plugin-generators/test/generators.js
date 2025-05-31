import {createTest} from '@putout/test';
import * as generators from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['generators', generators],
    ],
});

test('plugin-generators: transform: convert-multiply-to-generator', (t) => {
    t.transform('convert-multiply-to-generator');
    t.end();
});

test('plugin-for-of: transform: add-missing-star', (t) => {
    t.transform('add-missing-star');
    t.end();
});
