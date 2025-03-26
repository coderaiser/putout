import {createTest} from '@putout/test';
import * as filesystem from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'filesystem/read-all-files': 'on',
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: read-all-files', (t) => {
    t.transformWithOptions('read-all-files', {
        mask: '*.js',
    });
    t.end();
});
