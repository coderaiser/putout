import {createTest} from '@putout/test';
import * as labels from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['labels', labels],
    ],
});

test('plugin-labels: transform: convert-to-object', (t) => {
    t.transform('convert-to-object');
    t.end();
});

test('plugin-labels: transform: remove-unused', (t) => {
    t.transform('remove-unused');
    t.end();
});
