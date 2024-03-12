import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    'eslint/remove-no-unpublished-require': plugin,
});

test('putout: plugin-eslint: remove-no-unpublished-require: report', (t) => {
    t.report('remove-no-unpublished-require', `Remove 'node/no-unpublished-require'`);
    t.end();
});

test('putout: plugin-eslint: remove-no-unpublished-require: transform', (t) => {
    t.transform('remove-no-unpublished-require');
    t.end();
});
