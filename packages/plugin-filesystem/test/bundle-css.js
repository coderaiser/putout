'use strict';

const {createTest} = require('@putout/test');
const filesystem = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    rules: {
        'filesystem/bundle-css': ['on', {
            groups: ['1:1'],
        }],
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: bundle-css', (t) => {
    t.transform('bundle-css');
    t.end();
});
