import {createTest} from '@putout/test';
import * as cutLegacy from '../lib/cut-legacy.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['cut-legacy', cutLegacy],
    ],
});

test('codemod-cut-legacy: report', (t) => {
    t.report('legacy', 'Suffix "legacy" should be avoided');
    t.end();
});

test('codemod-cut-legacy: transform', (t) => {
    t.transform('legacy');
    t.end();
});

test('codemod-cut-legacy: no transform: id', (t) => {
    t.noTransform('id');
    t.end();
});
