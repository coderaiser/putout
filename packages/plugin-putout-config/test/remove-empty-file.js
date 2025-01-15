'use strict';

const {createTest} = require('@putout/test');
const putoutConfig = require('..');

const test = createTest(__dirname, {
    rules: {
        'putout-config/remove-empty-file': 'on',
    },
    plugins: [
        ['putout-config', putoutConfig],
    ],
});

test('plugin-nodejs: remove-empty-file: report', (t) => {
    t.report('remove-empty-file', `Remove empty '.putout.json'`);
    t.end();
});

test('plugin-nodejs: remove-empty-file: transform: remove-empty-file-on', (t) => {
    t.transform('remove-empty-file-on');
    t.end();
});
