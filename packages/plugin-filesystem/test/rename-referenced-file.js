'use strict';

const {createTest} = require('@putout/test');
const filesystem = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    rules: {
        'filesystem/rename-referenced-file': ['on', {
            from: 'hello.js',
            to: 'world.js',
        }],
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: rename-referenced-file', (t) => {
    t.transform('rename-referenced-file');
    t.end();
});
