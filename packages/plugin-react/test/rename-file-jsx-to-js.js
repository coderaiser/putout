import {createTest} from '@putout/test';
import * as react from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'react/rename-file-jsx-to-js': 'on',
    },
    plugins: [
        ['react', react],
    ],
});

test('plugin-react: transform: rename-file-jsx-to-js: rename-file-jsx-to-js-on', (t) => {
    t.transform('rename-file-jsx-to-js-on');
    t.end();
});
