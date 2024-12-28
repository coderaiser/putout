'use strict';

const {createTest} = require('@putout/test');
const filesystem = require('..');

const test = createTest(__dirname, {
    rules: {
        'filesystem/convert-filesystem-to-simple-filesystem': 'on',
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: convert-filesystem-to-simple-filesystem', (t) => {
    t.transform('convert-filesystem-to-simple-filesystem');
    t.end();
});
