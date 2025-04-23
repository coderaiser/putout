import {createTest} from '#test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-args', plugin],
    ],
});

test('putout: processor-wasm: remove-useless-args: report', (t) => {
    t.report('remove-useless-args', `Avoid useless arguments in 'one' call`);
    t.end();
});

test('putout: processor-wasm: remove-useless-args: transform', (t) => {
    t.transform('remove-useless-args');
    t.end();
});
