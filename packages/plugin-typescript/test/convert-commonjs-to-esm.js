import {createTest} from '@putout/test';
import * as typescript from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'typescript/convert-commonjs-to-esm': 'on',
    },
    plugins: [
        ['typescript', typescript],
    ],
});

test('plugin-typescript: transform: convert-commonjs-to-esm: convert-commonjs-to-esm-on', (t) => {
    t.transform('convert-commonjs-to-esm-on');
    t.end();
});
