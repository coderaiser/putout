'use strict';

const {createTest} = require('@putout/test');
const filesystem = require('..');

const test = createTest(__dirname, {
    rules: {
        'filesystem/read-all-files': 'on',
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: read-all-files', (t) => {
    t.transformWithOptions('read-all-files', {
        mask: '*.js',
    });
    t.end();
});
