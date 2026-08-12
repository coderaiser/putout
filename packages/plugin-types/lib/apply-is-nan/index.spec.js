import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-is-nan', plugin],
    ],
});

test('types: apply-is-nan: report', (t) => {
    t.report('apply-is-nan', `Use 'isNaN' instead of comparing`);
    t.end();
});

test('types: apply-is-nan: transform', (t) => {
    t.transform('apply-is-nan');
    t.end();
});
