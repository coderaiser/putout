import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-unused', plugin],
    ],
});

test('wasm: remove-unused: report', (t) => {
    t.report('remove-unused', `Avoid unused 'one'`);
    t.end();
});

test('wasm: remove-unused: transform', (t) => {
    t.transform('remove-unused');
    t.end();
});
