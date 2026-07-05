import {createTest} from '@putout/test';
import * as wasm from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['wasm', wasm],
    ],
});

test('plugin-wasm: transform: apply-nesting', (t) => {
    t.transform('apply-nesting');
    t.end();
});
