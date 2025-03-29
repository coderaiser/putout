import {createTest} from '@putout/test';
import * as nextjs from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['nextjs', nextjs],
    ],
});

test('plugin-nextjs: transform: remove-a-from-link', (t) => {
    t.transform('remove-a-from-link');
    t.end();
});

test('plugin-nextjs: transform: convert-page-to-head', (t) => {
    t.transform('convert-page-to-head');
    t.end();
});

test('plugin-nextjs: transform: update-tsconfig-file', (t) => {
    t.transform('update-tsconfig-file');
    t.end();
});

test('plugin-nextjs: no transform: update-tsconfig: update-tsconfig-disabled', (t) => {
    t.noTransform('update-tsconfig-disabled');
    t.end();
});
