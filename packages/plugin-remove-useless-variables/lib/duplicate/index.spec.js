import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['duplicate', plugin],
    ],
});

test('remove-useless-variables: duplicate: report', (t) => {
    t.report('duplicate', `Avoid duplicate declaration of 'DestructuringErrors'`);
    t.end();
});

test('remove-useless-variables: duplicate: transform', (t) => {
    t.transform('duplicate');
    t.end();
});
