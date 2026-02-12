import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-resolve-to-async', plugin],
    ],
});

test('promises: convert-resolve-to-async: report', (t) => {
    t.report('convert-resolve-to-async', `Use 'async function' instead of 'Promise.resolve()'`);
    t.end();
});

test('promises: convert-resolve-to-async: transform', (t) => {
    t.transform('convert-resolve-to-async');
    t.end();
});
