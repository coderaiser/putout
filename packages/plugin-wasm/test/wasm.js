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

test('plugin-wasm: transform: convert-get-local-to-local-get', (t) => {
    t.transform('convert-get-local-to-local-get');
    t.end();
});

test('plugin-wasm: transform: convert-set-local-to-local-set', (t) => {
    t.transform('convert-set-local-to-local-set');
    t.end();
});

test('plugin-wasm: transform: remove-unused', (t) => {
    t.transform('remove-unused');
    t.end();
});
