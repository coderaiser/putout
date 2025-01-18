'use strict';

const {createTest} = require('@putout/test');
const renameSeriesToRun = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['madrun/rename-series-to-run', renameSeriesToRun],
    ],
});

test('madrun: rename-series-to-run: report: series', (t) => {
    t.report('series', `"run" should be called instead of "series"`);
    t.end();
});

test('madrun: rename-series-to-run: transform: series', (t) => {
    t.transform('series');
    t.end();
});
