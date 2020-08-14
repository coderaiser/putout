'use strict';

const test = require('@putout/test')(__dirname, {
    cloudcmd: require('..'),
});

test('cloudcmd: IO.mv: report', (t) => {
    t.report('mv', 'IO.move should be used instead of IO.mv');
    t.end();
});

test('cloudcmd: IO.mv: transform: string', (t) => {
    t.transform('mv');
    t.end();
});

