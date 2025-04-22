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

test('putout: processor-wasm: remove-unused: no report: exported', (t) => {
    t.noReport('exported');
    t.end();
});
