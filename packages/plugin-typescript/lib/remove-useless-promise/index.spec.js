import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['typescript/remove-useless-promise', plugin],
    ],
});

test('typescript: remove useless promise: report: remove-useless-promise', (t) => {
    t.report('remove-useless-promise', `Avoid useless 'Promise' type`);
    t.end();
});

test('typescript: remove useless promise: transform: remove-useless-promise', (t) => {
    t.transform('remove-useless-promise');
    t.end();
});
