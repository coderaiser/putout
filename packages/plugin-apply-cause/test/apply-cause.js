import {createTest} from '@putout/test';
import * as plugin from '../lib/apply-cause.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-cause', plugin],
    ],
});

test('putout: apply-cause: report', (t) => {
    t.report('apply-cause', `Add missing cause`);
    t.end();
});

test('putout: apply-cause: transform', (t) => {
    t.transform('apply-cause');
    t.end();
});
