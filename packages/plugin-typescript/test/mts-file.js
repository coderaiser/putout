import {createTest} from '@putout/test';
import * as typescript from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'typescript/mts-file': 'on',
    },
    plugins: [
        ['typescript', typescript],
    ],
});

test('plugin-typescript: transform: mts-file: mts-file-on', (t) => {
    t.transform('mts-file-on');
    t.end();
});
