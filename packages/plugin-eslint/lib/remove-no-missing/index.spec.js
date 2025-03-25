import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    'eslint/remove-no-missing': plugin,
});

test('putout: plugin-eslint: remove-no-missing: report', (t) => {
    t.report('remove-no-missing', `Remove 'node/no-missing-(require,import)'`);
    t.end();
});

test('putout: plugin-eslint: remove-no-missing: transform', (t) => {
    t.transform('remove-no-missing');
    t.end();
});
