'use strict';

const {createTest} = require('@putout/test');
const filesystem = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    rules: {
        'filesystem/move-referenced-file': ['on', {
            name: 'hello.js',
            directory: 'lib',
        }],
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: move-referenced-file', (t) => {
    t.transform('move-referenced-file');
    t.end();
});
