import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['typescript/remove-setter-return-type', plugin],
    ],
});

test('plugin-typescript: remove-setter-return-type: report', (t) => {
    t.report('remove-setter-return-type', 'Avoid setter return type');
    t.end();
});

test('plugin-typescript: remove-setter-return-type: transform', (t) => {
    t.transform('remove-setter-return-type');
    t.end();
});

test('plugin-typescript: remove-setter-return-type: no transform: getter', (t) => {
    t.noTransform('getter');
    t.end();
});
