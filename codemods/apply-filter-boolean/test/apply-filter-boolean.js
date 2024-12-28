import {createTest} from '@putout/test';
import * as applyFilterBoolean from '../lib/apply-filter-boolean.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-filter-boolean', applyFilterBoolean],
    ],
});

test('plugin-apply-filter-boolean: report', (t) => {
    t.report('array', 'Use Boolean constructor');
    t.end();
});

test('plugin-apply-filter-boolean: transform: array', (t) => {
    t.transform('array');
    t.end();
});

test('plugin-apply-filter-boolean: transform: find', (t) => {
    t.transform('find');
    t.end();
});
