'use strict';

const {createTest} = require('@putout/test');
const filesystem = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    rules: {
        'filesystem/convert-json-to-js': ['on', {
            filename: 'package.json',
        }],
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: convert-json-to-js', (t) => {
    t.transform('convert-json-to-js');
    t.end();
});
