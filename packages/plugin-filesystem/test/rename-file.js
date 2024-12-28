'use strict';

const {createTest} = require('@putout/test');
const filesystem = require('..');

const test = createTest(__dirname, {
    rules: {
        'filesystem/rename-file': ['on', {
            from: 'README.md',
            to: 'readme.md',
        }],
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: rename-file', (t) => {
    t.transform('rename-file');
    t.end();
});
