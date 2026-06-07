import {createTest} from '@putout/test';
import * as filesystem from '#filesystem';

const test = createTest(import.meta.url, {
    rules: {
        'filesystem/convert-json-to-toml': ['on', {
            filename: 'bunfig.json',
        }],
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: convert-json-to-toml', (t) => {
    t.transform('convert-json-to-toml');
    t.end();
});
