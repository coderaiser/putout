import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-memoizations', plugin],
    ],
});

test('react: remove-useless-memoizations: report', (t) => {
    t.report('remove-useless-memoizations', `Avoid memo functions when react compiler activated`);
    t.end();
});

test('react: remove-useless-memoizations: transform', (t) => {
    t.transform('remove-useless-memoizations');
    t.end();
});
