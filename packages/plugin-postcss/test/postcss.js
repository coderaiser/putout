import {createTest} from '@putout/test';
import * as postcss from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['postcss', postcss],
    ],
});

test('plugin-postcss: transform: replace-plugin-with-creator', (t) => {
    t.transform('replace-plugin-with-creator');
    t.end();
});
