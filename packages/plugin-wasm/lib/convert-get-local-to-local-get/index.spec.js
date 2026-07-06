import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-get-local-to-local-get', plugin],
    ],
});

test('wasm: convert-get-local-to-local-get: report', (t) => {
    t.report('convert-get-local-to-local-get', `Use 'local.get' instead of 'get_local'`);
    t.end();
});

test('wasm: convert-get-local-to-local-get: transform', (t) => {
    t.transform('convert-get-local-to-local-get');
    t.end();
});
