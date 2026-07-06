import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-set-local-to-local-set', plugin],
    ],
});

test('wasm: convert-set-local-to-local-set: report', (t) => {
    t.report('convert-set-local-to-local-set', `Use 'local.set' instead of 'set_local'`);
    t.end();
});

test('wasm: convert-set-local-to-local-set: transform', (t) => {
    t.transform('convert-set-local-to-local-set');
    t.end();
});
