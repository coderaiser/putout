import {createTest} from '@putout/test';
import * as removeOverrides from '../remove-overrides-with-empty-rules/index.js';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-properties', plugin],
    ],
});

test('eslint: remove-useless-properties: report', (t) => {
    t.report('remove-useless-properties', `Remove useless properties: rules`);
    t.end();
});

test('eslint: remove-useless-properties: no report: comments', (t) => {
    t.noReport('comments');
    t.end();
});

test('eslint: remove-useless-properties: transform', (t) => {
    t.transform('remove-useless-properties');
    t.end();
});

test('eslint: remove-useless-properties: transform: call-expression-empty-object', (t) => {
    t.transform('call-expression-empty-object', {
        removeOverrides,
    });
    t.end();
});
