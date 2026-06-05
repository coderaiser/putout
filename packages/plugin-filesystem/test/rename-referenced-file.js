import {createTest} from '@putout/test';
import * as filesystem from '#filesystem';

const test = createTest(import.meta.url, {
    rules: {
        'filesystem/rename-referenced-file': ['on', {
            from: 'hello.js',
            to: 'world.js',
        }],
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: rename-referenced-file', (t) => {
    t.transform('rename-referenced-file');
    t.end();
});
