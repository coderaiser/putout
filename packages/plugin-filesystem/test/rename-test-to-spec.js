'use strict';

const {createTest} = require('@putout/test');
const filesystem = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    rules: {
        'filesystem/rename-test-to-spec': 'on',
    },
    plugins: [
        ['filesystem', filesystem],
    ],
});

test('plugin-filesystem: transform: rename-test-to-spec', (t) => {
    t.transform('rename-test-to-spec');
    t.end();
});
