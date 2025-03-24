import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-array-in-run', plugin],
    ],
});

test('packages: remove-useless-array-in-run: report', (t) => {
    t.report('remove-useless-array-in-run', `Avoid useless array when pass arguments to 'run()'`);
    t.end();
});

test('packages: remove-useless-array-in-run: transform', (t) => {
    t.transform('remove-useless-array-in-run');
    t.end();
});

test('packages: remove-useless-array-in-run: no transform: not-string', (t) => {
    t.noTransform('not-string');
    t.end();
});
