import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-empty-object-from-transform', plugin],
    ],
});

test('putout: remove-empty-object-from-transform: report', (t) => {
    t.report('remove-empty-object-from-transform', `Avoid useless empty object passed to 't.transform()'`);
    t.end();
});

test('putout: remove-empty-object-from-transform: transform', (t) => {
    t.transform('remove-empty-object-from-transform');
    t.end();
});
