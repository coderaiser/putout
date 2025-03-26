import {createTest} from '@putout/test';
import * as filesystem from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'filesystem/convert-simple-filesystem-to-filesystem': 'on',
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: convert-simple-filesystem-to-filesystem', (t) => {
    t.transform('convert-simple-filesystem-to-filesystem');
    t.end();
});
