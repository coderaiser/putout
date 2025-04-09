import {createTest} from '@putout/test';
import * as esm from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'esm/add-index-to-import': 'on',
    },
    plugins: [
        ['esm', esm],
    ],
});

test('plugin-esm: transform: add-index-to-import-on', (t) => {
    t.transform('add-index-to-import-on');
    t.end();
});
