import {createTest} from '@putout/test';
import * as plugin from '../lib/remove-duplicate-elements.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-duplicate-elements', plugin],
    ],
});

test('putout: remove-duplicate-elements: report', (t) => {
    t.report('remove-duplicate-elements', `Avoid duplicate elements: ''`);
    t.end();
});

test('putout: remove-duplicate-elements: transform', (t) => {
    t.transform('remove-duplicate-elements');
    t.end();
});
