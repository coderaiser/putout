'use strict';

const test = require('@putout/test')(__dirname, {
    'add-run': require('.'),
});

test('madrun: add fix:lint: report', (t) => {
    t.report('no-run', 'run should be declared');
    t.end();
});

test('madrun: add fix:lint: transform: exists', (t) => {
    t.transform('no-run');
    t.end();
});

test('madrun: add fix:lint: transform: exists', (t) => {
    t.noTransform('run');
    t.end();
});

