import {createTest} from '@putout/test';
import * as plugin from '../lib/convert-object-keys-to-object-entries.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-object-keys-to-object-entries', plugin],
    ],
});

test('putout: convert-object-keys-to-object-entries: report', (t) => {
    t.report('convert-object-keys-to-object-entries', `Use 'Object.entries()' instead of 'Object.keys()'`);
    t.end();
});

test('putout: convert-object-keys-to-object-entries: transform', (t) => {
    t.transform('convert-object-keys-to-object-entries');
    t.end();
});
