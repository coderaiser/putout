import {createTest} from '@putout/test';
import * as applyIsArray from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-is-array', applyIsArray],
    ],
});

test('plugin-apply-is-array: report: instanceof', (t) => {
    t.report('instanceof', `Use 'Array.isArray()' instead of 'instanceof'`);
    t.end();
});

test('plugin-apply-is-array: transform: instanceof', (t) => {
    t.transform('instanceof');
    t.end();
});

test('plugin-apply-is-array: transform: inline', (t) => {
    t.transformWithOptions('inline', {
        inline: true,
    });
    t.end();
});
