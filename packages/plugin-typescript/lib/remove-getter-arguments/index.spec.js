import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['typescript/remove-getter-arguments', plugin],
    ],
});

test('plugin-typescript: remove-getter-arguments: report', (t) => {
    t.report('remove-getter-arguments', 'Avoid getter arguments');
    t.end();
});

test('plugin-typescript: remove-getter-arguments: transform', (t) => {
    t.transform('remove-getter-arguments');
    t.end();
});

test('plugin-typescript: remove-getter-arguments: no transform: setter', (t) => {
    t.noTransform('setter');
    t.end();
});
