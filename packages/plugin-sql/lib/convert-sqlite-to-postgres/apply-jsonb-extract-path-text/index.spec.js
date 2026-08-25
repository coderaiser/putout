import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-jsonb-extract-path-text', plugin],
    ],
});

test('sql: apply-jsonb-extract-path-text: report', (t) => {
    t.report('apply-jsonb-extract-path-text', `Use 'jsonb_extract_path_text()' instead of 'jsonb_extract()'`);
    t.end();
});

test('sql: apply-jsonb-extract-path-text: transform', (t) => {
    t.transform('apply-jsonb-extract-path-text');
    t.end();
});
