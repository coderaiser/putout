import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-jest-to-vitest', plugin],
    ],
});

test('vitest: convert-jest-to-vitest: report', (t) => {
    t.report('convert-jest-to-vitest', `Use 'vitest' instead of 'jest'`);
    t.end();
});

test('vitest: convert-jest-to-vitest: transform', (t) => {
    t.transform('convert-jest-to-vitest');
    t.end();
});
