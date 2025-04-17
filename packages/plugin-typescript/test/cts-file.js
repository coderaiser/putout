import {createTest} from '@putout/test';
import * as typescript from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'typescript/cts-file': 'on',
    },
    plugins: [
        ['typescript', typescript],
    ],
});

test('plugin-typescript: transform: cts-file: cts-file-on', (t) => {
    t.transform('cts-file-on');
    t.end();
});
