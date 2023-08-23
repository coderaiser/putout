import {createTest} from '@putout/test';
import * as plugin from '../lib/apply-entries.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['apply-entries', plugin],
    ],
});

test('putout: apply-entries: report', (t) => {
    t.report('apply-entries', `Use 'entries()' instead of '.entries()`);
    t.end();
});

test('putout: apply-entries: transform', (t) => {
    t.transform('apply-entries');
    t.end();
});

test('putout: apply-entries: no transform: declared', (t) => {
    t.noTransform('declared');
    t.end();
});
