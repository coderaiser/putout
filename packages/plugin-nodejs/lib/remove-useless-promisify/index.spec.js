import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-promisify', plugin],
    ],
});

test('nodejs: remove-useless-promisify: report', (t) => {
    t.report('remove-useless-promisify', `Calling 'promisify' on a function that returns a Promise is likely a mistake`);
    t.end();
});

test('nodejs: remove-useless-promisify: transform', (t) => {
    t.transform('remove-useless-promisify');
    t.end();
});
