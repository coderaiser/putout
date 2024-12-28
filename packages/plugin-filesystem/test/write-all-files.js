'use strict';

const {createTest} = require('@putout/test');
const filesystem = require('..');

const test = createTest(__dirname, {
    rules: {
        'filesystem/write-all-files': 'on',
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: write-all-files', (t) => {
    t.transform('write-all-files');
    t.end();
});
