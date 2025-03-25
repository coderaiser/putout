import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    'eslint/remove-overrides-with-empty-rules': plugin,
});

test('putout: plugin-eslint: remove-overrides-with-empty-rules: report', (t) => {
    t.report('remove-overrides-with-empty-rules', `Avoid 'overrides' with empty 'rules'`);
    t.end();
});

test('putout: plugin-eslint: remove-overrides-with-empty-rules: transform', (t) => {
    t.transform('remove-overrides-with-empty-rules');
    t.end();
});

test('putout: plugin-eslint: remove-overrides-with-empty-rules: transform: couple-overrides', (t) => {
    t.transform('couple-overrides');
    t.end();
});
