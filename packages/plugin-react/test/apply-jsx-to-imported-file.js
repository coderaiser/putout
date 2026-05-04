import {createTest} from '@putout/test';
import * as react from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'react/apply-jsx-to-imported-file': 'on',
    },
    plugins: [
        ['react', react],
    ],
});

test('plugin-react: transform: apply-jsx-to-imported-file: apply-jsx-to-imported-file-on', (t) => {
    t.transform('apply-jsx-to-imported-file-on');
    t.end();
});
