'use strict';

const test = require('@putout/test')(__dirname, {
    'cloudcmd/convert-io-cp-to-io-copy': require('.'),
});

test('cloudcmd: convert-io-cp-to-io-copy: IO.cp: report', (t) => {
    t.report('cp', 'IO.copy should be used instead of IO.cp');
    t.end();
});

test('cloudcmd: convert-io-cp-to-io-copy: IO.cp: transform: string', (t) => {
    t.transform('cp');
    t.end();
});

