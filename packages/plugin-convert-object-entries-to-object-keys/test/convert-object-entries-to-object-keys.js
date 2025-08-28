import {createTest} from '@putout/test';
import * as plugin from '../lib/convert-object-entries-to-object-keys.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-object-entries-to-object-keys', plugin],
    ],
});

test('putout: convert-object-entries-to-object-keys: report', (t) => {
    t.report('convert-object-entries-to-object-keys', `Use 'Object.keys()' instead of 'Object.entries()'`);
    t.end();
});

test('putout: convert-object-entries-to-object-keys: transform', (t) => {
    t.transform('convert-object-entries-to-object-keys');
    t.end();
});
