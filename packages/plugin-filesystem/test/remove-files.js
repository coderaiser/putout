import {createTest} from '@putout/test';
import * as filesystem from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'filesystem/remove-files': ['on', {
            names: ['*.md'],
        }],
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: remove-files', (t) => {
    t.transform('remove-files');
    t.end();
});
