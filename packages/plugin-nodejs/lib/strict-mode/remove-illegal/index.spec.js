import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-illegal-strict-mode', plugin],
    ],
});

test('lib: remove-illegal-strict-mode: report', (t) => {
    t.report('remove-illegal-strict-mode', `Avoid illegal 'use strict'`);
    t.end();
});

test('lib: remove-illegal-strict-mode: transform', (t) => {
    t.transform('remove-illegal-strict-mode');
    t.end();
});
