import {createTest} from '@putout/test';
import * as removeAFromLink from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-a-from-link', removeAFromLink],
    ],
});

test('plugin-nextjs: remove-a-from-link: report: link', (t) => {
    t.report('link', `Remove '<a>' from <Link>, it always renders under the hood`);
    t.end();
});

test('plugin-nextjs: remove-a-from-link: transform: link', (t) => {
    t.transform('link');
    t.end();
});

test('plugin-nextjs: remove-a-from-link: no transform: no-link', (t) => {
    t.noTransform('no-link');
    t.end();
});
