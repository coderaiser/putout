'use strict';

const test = require('@putout/test')(__dirname, {
    'call-run': require('.'),
});

test('madrun: call run: report', (t) => {
    t.report('redrun', '"run" should be called in script: "lint"');
    t.end();
});

test('madrun: call run: transform: redrun', (t) => {
    t.transform('redrun');
    t.end();
});

test('madrun: call run: transform: redrun: args', (t) => {
    t.transform('redrun-args');
    t.end();
});

test('madrun: call run: transform: npm: args', (t) => {
    t.transform('npm-args');
    t.end();
});

