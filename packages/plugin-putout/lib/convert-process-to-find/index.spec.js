'use strict';

const {createTest} = require('@putout/test');
const convertProcessToFind = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['putout/convert-process-to-find', convertProcessToFind],
    ],
});

test('plugin-putout: convert-process-to-find: report: process', (t) => {
    t.report('process', 'Use find instead of process');
    t.end();
});

test('plugin-putout: convert-process-to-find: transform: process', (t) => {
    t.transform('process');
    t.end();
});
