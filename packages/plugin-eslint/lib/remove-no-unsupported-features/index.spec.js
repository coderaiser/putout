import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    'eslint/remove-no-unsupported-features': plugin,
});

test('putout: plugin-eslint: remove-no-unsupported-features: report', (t) => {
    t.report('remove-no-unsupported-features', `Remove 'node/no-unsupported-features'`);
    t.end();
});

test('putout: plugin-eslint: remove-no-unsupported-features: transform', (t) => {
    t.transform('remove-no-unsupported-features');
    t.end();
});
