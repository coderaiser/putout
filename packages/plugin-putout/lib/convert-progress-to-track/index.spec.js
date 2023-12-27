'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['convert-progress-to-track', plugin],
    ],
});

test('packages: convert-progress-to-track: report', (t) => {
    t.report('convert-progress-to-track', `Convert 'progress()' to 'trackFile()'`);
    t.end();
});

test('packages: convert-progress-to-track: transform', (t) => {
    t.transform('convert-progress-to-track');
    t.end();
});

test('packages: convert-progress-to-track: no transform: no-for-of', (t) => {
    t.noTransform('no-for-of');
    t.end();
});
