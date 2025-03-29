import {createTest} from '@putout/test';
import * as removeAFromLink from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-page-to-head', removeAFromLink],
    ],
});

test('plugin-nextjs: convert-page-to-head: report: head', (t) => {
    t.report('head', `Use 'Head' instead of 'Page'`);
    t.end();
});

test('plugin-nextjs: convert-page-to-head: transform: head', (t) => {
    t.transform('head');
    t.end();
});

test('plugin-nextjs: convert-page-to-head: no transform: no-head', (t) => {
    t.noTransform('no-head');
    t.end();
});
