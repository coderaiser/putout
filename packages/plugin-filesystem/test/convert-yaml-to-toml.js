import {createTest} from '@putout/test';
import * as filesystem from '#filesystem';

const test = createTest(import.meta.url, {
    rules: {
        'filesystem/convert-yaml-to-toml': ['on', {
            filename: 'bunfig.yaml',
        }],
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: convert-yaml-to-toml', (t) => {
    t.transform('convert-yaml-to-toml');
    t.end();
});
