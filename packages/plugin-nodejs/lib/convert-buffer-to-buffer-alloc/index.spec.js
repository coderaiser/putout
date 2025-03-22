import {createTest} from '@putout/test';
import * as convert from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['nodejs/convert-buffer-to-buffer-alloc', convert],
    ],
});

test('nodejs: convert-buffer-to-buffer-alloc: report', (t) => {
    t.report('convert-buffer-to-buffer-alloc', `Use 'Buffer.alloc()' or 'Buffer.from()' instead of 'Buffer()' and 'new Buffer()'`);
    t.end();
});

test('nodejs: convert-buffer-to-buffer-alloc: transform', (t) => {
    t.transform('convert-buffer-to-buffer-alloc');
    t.end();
});

test('nodejs: convert-buffer-to-buffer-alloc: transform: couple-args', (t) => {
    t.transform('couple-args');
    t.end();
});
