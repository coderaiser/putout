'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['convert-progress-to-track-file', plugin],
    ],
});

test('packages: convert-progress-to-track-file: report', (t) => {
    t.report('convert-progress-to-track-file', `Convert 'progress()' to 'trackFile()'`);
    t.end();
});

test('packages: convert-progress-to-track-file: transform', (t) => {
    t.transform('convert-progress-to-track-file');
    t.end();
});

test('packages: convert-progress-to-track-file: no transform: no-for-of', (t) => {
    t.noTransform('no-for-of');
    t.end();
});

test('packages: convert-process-to-find: no transform: couple-for-of', (t) => {
    t.noTransform('couple-for-of');
    t.end();
});
