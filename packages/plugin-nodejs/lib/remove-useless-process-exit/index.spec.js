import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-process-exit', plugin],
    ],
});

test('nodejs: remove-useless-process-exit: report', (t) => {
    t.report('remove-useless-process-exit', `Avoid useless 'process.exit()'`);
    t.end();
});

test('nodejs: remove-useless-process-exit: transform', (t) => {
    t.transform('remove-useless-process-exit');
    t.end();
});
