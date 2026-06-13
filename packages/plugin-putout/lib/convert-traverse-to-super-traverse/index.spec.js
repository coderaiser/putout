import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-traverse-to-super-traverse', plugin],
    ],
});

test('putout: convert-traverse-to-super-traverse: report', (t) => {
    t.report('convert-traverse-to-super-traverse', `Use 'superTraverse' instead of 'traverse'`);
    t.end();
});

test('putout: convert-traverse-to-super-traverse: transform', (t) => {
    t.transform('convert-traverse-to-super-traverse');
    t.end();
});

test('putout: convert-traverse-to-super-traverse: transform: declared', (t) => {
    t.transform('declared');
    t.end();
});

test('putout: convert-traverse-to-super-traverse: no report: fn', (t) => {
    t.noReport('fn');
    t.end();
});
