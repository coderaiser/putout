import {createTest} from '@putout/test';
import * as esm from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'esm/shorten-imported-file': 'on',
    },
    plugins: [
        ['esm', esm],
    ],
});

test('plugin-esm: transform: shorten-imported-file-on', (t) => {
    t.transform('shorten-imported-file-on');
    t.end();
});
