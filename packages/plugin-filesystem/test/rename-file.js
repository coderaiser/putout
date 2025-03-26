import {createTest} from '@putout/test';
import * as filesystem from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'filesystem/rename-file': ['on', {
            from: 'README.md',
            to: 'readme.md',
        }],
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: rename-file', (t) => {
    t.transform('rename-file');
    t.end();
});
