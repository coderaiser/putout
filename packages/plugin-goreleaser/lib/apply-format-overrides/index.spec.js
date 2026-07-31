import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-format-overrides', plugin],
    ],
});

test('goreleaser: apply-format-overrides: report', (t) => {
    t.report('apply-format-overrides', `Use 'format_overrides' instead of 'format'`);
    t.end();
});

test('goreleaser: apply-format-overrides: transform', (t) => {
    t.transform('apply-format-overrides');
    t.end();
});
