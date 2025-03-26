import {createTest} from '@putout/test';
import * as filesystem from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'filesystem/rename-test-to-spec': 'on',
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: rename-test-to-spec', (t) => {
    t.transform('rename-test-to-spec');
    t.end();
});
