import {createTest} from '@putout/test';
import * as plugin from '../lib/remove-useless-array.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-array', plugin],
    ],
});

test('putout: remove-useless-array: report', (t) => {
    t.report('remove-useless-array', `Avoid array inside property accessors`);
    t.end();
});

test('putout: remove-useless-array: transform', (t) => {
    t.transform('remove-useless-array');
    t.end();
});
