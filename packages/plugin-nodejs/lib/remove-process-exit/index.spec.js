import {createTest} from '@putout/test';
import * as rmProcessExit from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-process-exit', rmProcessExit],
    ],
});

test('remove-process-exit: report: process-exit', (t) => {
    t.report('process-exit', '"process.exit" should not be used');
    t.end();
});

test('remove-process-exit: transform: process-exit', (t) => {
    t.transform('process-exit');
    t.end();
});
