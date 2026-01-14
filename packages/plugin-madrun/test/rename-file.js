import {createTest} from '@putout/test';
import * as madrun from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'madrun/rename-file': 'on',
    },
    plugins: [
        ['madrun', madrun],
    ],
});

test('plugin-madrun: transform: rename-file-on', (t) => {
    t.transform('rename-file-on');
    t.end();
});
