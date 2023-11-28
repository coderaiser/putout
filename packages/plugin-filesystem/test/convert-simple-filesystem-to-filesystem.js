'use strict';

const {createTest} = require('@putout/test');
const filesystem = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    rules: {
        'filesystem/convert-simple-filesystem-to-filesystem': 'on',
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: convert-simple-filesystem-to-filesystem', (t) => {
    t.transform('convert-simple-filesystem-to-filesystem');
    t.end();
});
