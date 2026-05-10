import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-exports', plugin],
    ],
});

test('package-json: remove-useless-exports: report', (t) => {
    t.report('remove-useless-exports', `Avoid useless 'exports'`);
    t.end();
});

test('package-json: remove-useless-exports: transform', (t) => {
    t.transform('remove-useless-exports');
    t.end();
});
