import {createTest} from '@putout/test';
import * as filesystem from '#filesystem';

const test = createTest(import.meta.url, {
    rules: {
        'filesystem/convert-json-to-yaml': ['on', {
            filename: 'actions.json',
        }],
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: convert-json-to-yaml', (t) => {
    t.transform('convert-json-to-yaml');
    t.end();
});
