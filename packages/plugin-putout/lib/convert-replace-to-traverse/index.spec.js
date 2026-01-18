import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-replace-to-traverse', plugin],
    ],
});

test('putout: convert-replace-to-traverse: report', (t) => {
    t.report('convert-replace-to-traverse', `Use 'traverse' instead of 'replace' when using 'fix'`);
    t.end();
});

test('putout: convert-replace-to-traverse: transform', (t) => {
    t.transform('convert-replace-to-traverse');
    t.end();
});

test('putout: convert-replace-to-traverse: no report: no-fix', (t) => {
    t.noReport('no-fix');
    t.end();
});
