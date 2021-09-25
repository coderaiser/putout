'use strict';

const test = require('@putout/test')(__dirname, {
    'tape/remove-useless-t-end': require('.'),
});

test('plugin-tape: remove-useless-t-end: report', (t) => {
    t.report('t-end', `Avoid useless 't.end()'`);
    t.end();
});

test('plugin-tape: remove-useless-t-end: transform', (t) => {
    t.transform('t-end');
    t.end();
});

