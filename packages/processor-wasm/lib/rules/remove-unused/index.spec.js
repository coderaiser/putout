import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-unused', plugin],
    ],
});

test('putout: processor-wasm: remove-unused: report', (t) => {
    t.report('remove-unused', `Avoid unused 'answer'`);
    t.end();
});

test('putout: processor-wasm: remove-unused: transform', (t) => {
    t.transform('remove-unused');
    t.end();
});

test('putout: processor-wasm: remove-unused: no report: export', (t) => {
    t.noReport('export');
    t.end();
});

test('putout: processor-wasm: remove-unused: no report: call', (t) => {
    t.noReport('call');
    t.end();
});

test('putout: processor-wasm: remove-unused: no report: export-inside', (t) => {
    t.noReport('export-inside');
    t.end();
});
