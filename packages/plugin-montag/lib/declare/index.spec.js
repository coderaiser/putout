import {createTest} from '@putout/test';
import * as declare from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['montag/declare', declare],
    ],
});

test('plugin-montag: declare: report: montag', (t) => {
    t.report('montag', `Declare 'montag', it referenced but not defined`);
    t.end();
});

test('plugin-montag: declare: transform: montag', (t) => {
    t.transform('montag');
    t.end();
});
