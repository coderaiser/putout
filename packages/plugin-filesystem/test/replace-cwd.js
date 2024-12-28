'use strict';

const {createTest} = require('@putout/test');
const filesystem = require('..');

const test = createTest(__dirname, {
    rules: {
        'filesystem/replace-cwd': ['on', {
            from: '/home/coderaiser/putout',
            to: '/',
        }],
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: replace-cwd', (t) => {
    t.transform('replace-cwd');
    t.end();
});
