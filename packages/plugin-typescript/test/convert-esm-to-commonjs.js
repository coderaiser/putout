import {createTest} from '@putout/test';
import * as typescript from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'typescript/convert-esm-to-commonjs': 'on',
    },
    plugins: [
        ['typescript', typescript],
    ],
});

test('plugin-typescript: transform: convert-esm-to-commonjs: convert-esm-to-commonjs-on', (t) => {
    t.transform('convert-esm-to-commonjs-on');
    t.end();
});
