import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-nesting', plugin],
    ],
});

test('putout: processor-wasm: apply-nesting: report', (t) => {
    t.report('apply-nesting', `Apply nesting for 'i32.add'`);
    t.end();
});

test('putout: processor-wasm: apply-nesting: transform', (t) => {
    t.transform('apply-nesting');
    t.end();
});

test('putout: processor-wasm: apply-nesting: no report: nested', (t) => {
    t.noReport('nested');
    t.end();
});

test('putout: processor-wasm: apply-nesting: transform: couple', (t) => {
    t.transform('couple');
    t.end();
});
