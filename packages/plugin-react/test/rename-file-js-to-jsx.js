import {createTest} from '@putout/test';
import * as react from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'react/rename-file-js-to-jsx': 'on',
    },
    plugins: [
        ['react', react],
    ],
});

test('plugin-react: transform: rename-file-js-to-jsx: rename-file-js-to-jsx-on', (t) => {
    t.transform('rename-file-js-to-jsx-on');
    t.end();
});
