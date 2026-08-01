import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-formats', plugin],
    ],
});

test('goreleaser: apply-formats: report', (t) => {
    t.report('apply-formats', `Use 'formats' instead of 'format'`);
    t.end();
});

test('goreleaser: apply-formats: transform', (t) => {
    t.transform('apply-formats');
    t.end();
});
