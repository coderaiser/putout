import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-errors-type', plugin],
    ],
});

test('eslint-plugin: remove-errors-type: report', (t) => {
    t.report('remove-errors-type', `Remove 'type' field`);
    t.end();
});

test('eslint-plugin: remove-errors-type: transform', (t) => {
    t.transform('remove-errors-type');
    t.end();
});
