import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['assignment', plugin],
    ],
});

test('remove-useless-variables: assignment: report', (t) => {
    t.report('assignment', `Avoid useless assignment`);
    t.end();
});

test('remove-useless-variables: assignment: transform', (t) => {
    t.transform('assignment');
    t.end();
});
