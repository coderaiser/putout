'use strict';

const {createTest} = require('@putout/test');
const convertProcessToFind = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['putout/convert-process-to-find', convertProcessToFind],
    ],
});

test('plugin-putout: convert-process-to-find: report', (t) => {
    t.report('process', 'Use find instead of process');
    t.end();
});

test('plugin-putout: convert-process-to-find: transform', (t) => {
    t.transform('process');
    t.end();
});
