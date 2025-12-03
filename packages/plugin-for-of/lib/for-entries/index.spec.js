import * as variables from '@putout/plugin-variables';
import {createTest} from '@putout/test';
import * as forEntries from './index.js';

const removeUnusedVariables = variables.rules['remove-unused'];

const test = createTest(import.meta.url, {
    plugins: [
        ['for-of/for-entries', forEntries],
    ],
});

test('plugin-for-of: for-entries: report: for', (t) => {
    t.report('for', `Use 'for...of' instead of 'for'`);
    t.end();
});

test('plugin-for-of: for-entries: no transform: no-body', (t) => {
    t.noTransform('no-body');
    t.end();
});

test('plugin-for-of: for-entries: no transform: index-references', (t) => {
    t.noTransform('index-references');
    t.end();
});

test('plugin-for-of: for-entries: no transform: changed-index', (t) => {
    t.noTransform('changed-index');
    t.end();
});

test('plugin-for-of: for-entries: no transform: index-not-identifier', (t) => {
    t.noTransform('index-not-identifier');
    t.end();
});

test('plugin-for-of: for-entries: transform: remove-useless-arguments', (t) => {
    t.transform('remove-useless-arguments', {
        'remove-unused-variables': removeUnusedVariables,
    });
    t.end();
});
