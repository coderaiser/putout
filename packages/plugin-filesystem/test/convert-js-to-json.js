'use strict';

const {createTest} = require('@putout/test');
const filesystem = require('..');

const test = createTest(__dirname, {
    rules: {
        'filesystem/convert-js-to-json': ['on', {
            filename: 'package.json',
        }],
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: convert-js-to-json', (t) => {
    t.transform('convert-js-to-json');
    t.end();
});
