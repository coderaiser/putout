import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-top-level-process-exit', plugin],
    ],
});

test('nodejs: remove-top-level-process-exit: report', (t) => {
    t.report('remove-top-level-process-exit', `Avoid useless 'process.exit()'`);
    t.end();
});

test('nodejs: remove-top-level-process-exit: transform', (t) => {
    t.transform('remove-top-level-process-exit');
    t.end();
});
