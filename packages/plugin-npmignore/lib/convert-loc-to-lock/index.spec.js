import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-loc-to-lock', plugin],
    ],
});

test('npmignore: convert-loc-to-lock: report', (t) => {
    t.report('convert-loc-to-lock', `Use '*.lock' instead of '*.loc'`);
    t.end();
});

test('npmignore: convert-loc-to-lock: transform', (t) => {
    t.transform('convert-loc-to-lock');
    t.end();
});
