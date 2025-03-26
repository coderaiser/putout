import {createTest} from '@putout/test';
import * as filesystem from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'filesystem/bundle': ['on', {
            groups: ['1:1'],
        }],
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: bundle', (t) => {
    t.transform('bundle');
    t.end();
});
