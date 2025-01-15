'use strict';

const {createTest} = require('@putout/test');
const callRun = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['call-run', callRun],
    ],
});

test('madrun: call run: report: redrun', (t) => {
    t.report('redrun', '"run" should be called in script: "lint"');
    t.end();
});

test('madrun: call run: transform: redrun', (t) => {
    t.transform('redrun');
    t.end();
});

test('madrun: call run: transform: redrun: redrun-args', (t) => {
    t.transform('redrun-args');
    t.end();
});

test('madrun: call run: transform: npm: npm-args', (t) => {
    t.transform('npm-args');
    t.end();
});
