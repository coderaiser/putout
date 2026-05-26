import {createTest} from '@putout/test';
import * as esm from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'esm/resolve-imported-file-with-extension': 'on',
    },
    plugins: [
        ['esm', esm],
    ],
});

test('plugin-esm: transform: resolve-imported-file-with-extension-on', (t) => {
    t.transform('resolve-imported-file-with-extension-on');
    t.end();
});
