import {createTest} from '@putout/test';
import * as convert from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['promises/add-missing-async', convert],
    ],
});

test('plugin-add-missing-async: exports: report: add-missing-async', (t) => {
    t.report('add-missing-async', `Add missing 'async'`);
    t.end();
});

test('plugin-add-missing-async: transform: add-missing-async', (t) => {
    t.transform('add-missing-async');
    t.end();
});

test('plugin-add-missing-async: no report: block', (t) => {
    t.noReport('block');
    t.end();
});

test('plugin-add-missing-async: no report: top-level', (t) => {
    t.noReport('top-level');
    t.end();
});
