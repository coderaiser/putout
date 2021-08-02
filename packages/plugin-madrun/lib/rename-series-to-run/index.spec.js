'use strict';

const test = require('@putout/test')(__dirname, {
    'madrun/rename-series-to-run': require('.'),
});

test('madrun: rename-series-to-run: report', (t) => {
    t.report('series', `"run" should be called instead of "series"`);
    t.end();
});

test('madrun: rename-series-to-run: transform: string', (t) => {
    t.transform('series');
    t.end();
});

