import {createTest} from '@putout/test';
import removeUnreferencedVariables from '@putout/plugin-remove-unreferenced-variables';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['merge-variables', plugin],
    ],
});

test('plugin-minify: merge-variables: report', (t) => {
    t.report('merge-variables', `Merge variables`);
    t.end();
});

test('plugin-minify: merge-variables: transform', (t) => {
    t.transform('merge-variables');
    t.end();
});

test('plugin-minify: merge-variables: transform: mutation', (t) => {
    t.transform('await');
    t.end();
});

test('plugin-minify: merge-variables: no transform: let', (t) => {
    t.noTransform('let');
    t.end();
});

test('plugin-minify: merge-variables: transform: remove-unreferenced-variables', (t) => {
    t.transform('remove-unreferenced-variables', {
        'remove-unreferenced-variables': removeUnreferencedVariables,
    });
    t.end();
});
