import {createTest} from '@putout/test';
import * as filesystem from '#filesystem';

const test = createTest(import.meta.url, {
    rules: {
        'filesystem/convert-toml-to-yaml': ['on', {
            filename: 'bunfig.toml',
        }],
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: convert-toml-to-yaml', (t) => {
    t.transform('convert-toml-to-yaml');
    t.end();
});
