import {createTest} from '@putout/test';
import * as esm from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'esm/apply-js-imported-file': 'on',
    },
    plugins: [
        ['esm', esm],
    ],
});

test('plugin-esm: transform: apply-js-imported-file-on', (t) => {
    t.transform('apply-js-imported-file-on');
    t.end();
});
