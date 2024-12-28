'use strict';

const {createTest} = require('@putout/test');
const filesystem = require('..');

const test = createTest(__dirname, {
    rules: {
        'filesystem/bundle': ['on', {
            groups: ['1:1'],
        }],
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: bundle', (t) => {
    t.transform('bundle');
    t.end();
});
