import {createTest} from '@putout/test';
import * as esm from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'esm/apply-namespace-import-to-file': 'on',
    },
    plugins: [
        ['esm', esm],
    ],
});

test('plugin-esm: transform: apply-namespace-import-to-file-on', (t) => {
    t.transform('apply-namespace-import-to-file-on');
    t.end();
});
