import {createTest} from '@putout/test';
import * as plugin from '../index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-quotes-from-import-assertions', plugin],
    ],
});

test('putout: remove-quotes-from-import-assertions: report', (t) => {
    t.report('remove-quotes-from-import-assertions', `Remove quotes from import assertions`);
    t.end();
});

test('putout: remove-quotes-from-import-assertions: transform', (t) => {
    t.transform('remove-quotes-from-import-assertions');
    t.end();
});
