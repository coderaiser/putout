import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['turn-off-schema', plugin],
    ],
});

test('packages: turn-off-schema: report', (t) => {
    t.report('turn-off-schema', `Turn off schema`);
    t.end();
});

test('packages: turn-off-schema: no report: bool', (t) => {
    t.noReport('bool');
    t.end();
});

test('packages: turn-off-schema: transform', (t) => {
    t.transform('turn-off-schema');
    t.end();
});
