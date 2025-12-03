import * as variables from '@putout/plugin-variables';
import {createTest} from '@putout/test';
import * as convertForToForOf from './index.js';

const removeUnusedVariables = variables.rules['remove-unused'];

const test = createTest(import.meta.url, {
    plugins: [
        ['for-of/length', convertForToForOf],
    ],
});

test('plugin-for-of: for-length: transform: remove-useless-arguments', (t) => {
    t.transform('remove-useless-arguments', {
        'remove-unused-variables': removeUnusedVariables,
    });
    t.end();
});

test('plugin-for-of: for-length: no transform: no-body', (t) => {
    t.noTransform('no-body');
    t.end();
});

test('plugin-for-of: for-length: no transform: entries', (t) => {
    t.noTransform('entries');
    t.end();
});
