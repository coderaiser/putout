import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-json-extract', plugin],
    ],
});

test('sql: apply-json-extract: report', (t) => {
    t.report('apply-json-extract', `Use 'json_extract()' instead of 'jsonb_extract_path_text()'`);
    t.end();
});

test('sql: apply-json-extract: transform', (t) => {
    t.transform('apply-json-extract');
    t.end();
});
