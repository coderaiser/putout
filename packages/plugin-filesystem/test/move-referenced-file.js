import {createTest} from '@putout/test';
import * as filesystem from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'filesystem/move-referenced-file': ['on', {
            name: 'hello.js',
            directory: 'lib',
        }],
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: move-referenced-file', (t) => {
    t.transform('move-referenced-file');
    t.end();
});
