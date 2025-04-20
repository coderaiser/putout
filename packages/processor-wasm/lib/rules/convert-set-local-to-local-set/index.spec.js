import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-set-local-t-local-set', plugin],
    ],
});

test('putout: processor-wasm: convert-set-local-to-local-set: report', (t) => {
    t.report('convert-set-local-to-local-set', `Use 'local.set' instead of 'set_local'`);
    t.end();
});

test('putout: processor-wasm: convert-set-local-to-local-set: transform', (t) => {
    t.transform('convert-set-local-to-local-set');
    t.end();
});
