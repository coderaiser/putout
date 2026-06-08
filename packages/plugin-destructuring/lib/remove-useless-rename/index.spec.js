import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-rename', plugin],
    ],
});

test('destructuring: remove-useless-rename: report', (t) => {
    t.report('remove-useless-rename', `Avoid useless destructuring rename`);
    t.end();
});

test('destructuring: remove-useless-rename: no report: no-rename', (t) => {
    t.noReport('no-rename');
    t.end();
});

test('destructuring: remove-useless-rename: no report: declared', (t) => {
    t.noReport('declared');
    t.end();
});

test('destructuring: remove-useless-rename: transform', (t) => {
    t.transform('remove-useless-rename');
    t.end();
});
