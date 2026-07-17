import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-empty-needs', plugin],
    ],
});

test('github: remove-empty-needs: report', (t) => {
    t.report('remove-empty-needs', `Avoid "needs: []"`);
    t.end();
});

test('github: remove-empty-needs: transform', (t) => {
    t.transform('remove-empty-needs');
    t.end();
});

test('github: remove-empty-needs: no report: string', (t) => {
    t.noReport('string');
    t.end();
});
