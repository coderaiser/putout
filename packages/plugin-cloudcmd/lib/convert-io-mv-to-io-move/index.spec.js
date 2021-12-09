'use strict';

const convertIoMvToIoMove = require('.');

const test = require('@putout/test')(__dirname, {
    'cloudcmd/convert-io-mv-to-io-move': convertIoMvToIoMove,
});

test('cloudcmd: convert-io-mv-to-io-move: IO.mv: report', (t) => {
    t.report('mv', 'IO.move should be used instead of IO.mv');
    t.end();
});

test('cloudcmd: convert-io-mv-to-io-move: IO.mv: transform: string', (t) => {
    t.transform('mv');
    t.end();
});
