import {createTest} from '@putout/test';
import * as filesystem from '#filesystem';

const test = createTest(import.meta.url, {
    rules: {
        'filesystem/replace-cwd': ['on', {
            from: '/home/coderaiser/putout',
            to: '/',
        }],
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: replace-cwd', (t) => {
    t.transform('replace-cwd');
    t.end();
});
