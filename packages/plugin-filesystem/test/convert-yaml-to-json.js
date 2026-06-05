import {createTest} from '@putout/test';
import * as filesystem from '#filesystem';

const test = createTest(import.meta.url, {
    rules: {
        'filesystem/convert-yaml-to-json': ['on', {
            filename: 'package.json',
        }],
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: convert-yaml-to-json', (t) => {
    t.transform('convert-yaml-to-json');
    t.end();
});
