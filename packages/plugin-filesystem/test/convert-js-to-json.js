import {createTest} from '@putout/test';
import * as filesystem from '#filesystem';

const test = createTest(import.meta.url, {
    rules: {
        'filesystem/convert-js-to-json': ['on', {
            filename: 'package.json',
        }],
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: convert-js-to-json', (t) => {
    t.transform('convert-js-to-json');
    t.end();
});
