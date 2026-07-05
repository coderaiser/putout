import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-nesting', plugin],
    ],
});

test('wasm: apply-nesting: report', (t) => {
    t.report('apply-nesting', `Use nestging`);
    t.end();
});

test('wasm: apply-nesting: transform', (t) => {
    t.transform('apply-nesting');
    t.end();
});
