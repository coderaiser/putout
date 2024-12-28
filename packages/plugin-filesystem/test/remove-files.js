'use strict';

const {createTest} = require('@putout/test');
const filesystem = require('..');

const test = createTest(__dirname, {
    rules: {
        'filesystem/remove-files': ['on', {
            names: ['*.md'],
        }],
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: remove-files', (t) => {
    t.transform('remove-files');
    t.end();
});
