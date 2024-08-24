'use strict';

const {createTest} = require('@putout/test');
const labels = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['labels', labels],
    ],
});

test('plugin-labels: transform: convert-to-object', (t) => {
    t.transform('convert-to-object');
    t.end();
});

test('plugin-labels: transform: remove-unused', (t) => {
    t.transform('remove-unused');
    t.end();
});

