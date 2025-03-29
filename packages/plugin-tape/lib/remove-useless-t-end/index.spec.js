import {createTest} from '@putout/test';
import * as removeUselessTEnd from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/remove-useless-t-end', removeUselessTEnd],
    ],
});

test('plugin-tape: remove-useless-t-end: report: t-end', (t) => {
    t.report('t-end', `Avoid useless 't.end()'`);
    t.end();
});

test('plugin-tape: remove-useless-t-end: transform: t-end', (t) => {
    t.transform('t-end');
    t.end();
});
