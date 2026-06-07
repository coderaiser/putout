import {createTest} from '@putout/test';
import * as filesystem from '#filesystem';

const test = createTest(import.meta.url, {
    rules: {
        'filesystem/convert-toml-to-json': ['on', {
            filename: 'bunfig.toml',
        }],
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: convert-toml-to-json', (t) => {
    t.transform('convert-toml-to-json');
    t.end();
});
