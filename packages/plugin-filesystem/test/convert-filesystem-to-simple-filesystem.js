import {createTest} from '@putout/test';
import * as filesystem from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'filesystem/convert-filesystem-to-simple-filesystem': 'on',
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: convert-filesystem-to-simple-filesystem', (t) => {
    t.transform('convert-filesystem-to-simple-filesystem');
    t.end();
});
