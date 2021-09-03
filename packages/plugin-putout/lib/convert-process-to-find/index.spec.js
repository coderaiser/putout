'use strict';

const test = require('@putout/test')(__dirname, {
    'putout/convert-process-to-find': require('.'),
});

test('plugin-putout: convert-process-to-find: report', (t) => {
    t.report('process', 'Use find instead of process');
    t.end();
});

test('plugin-putout: convert-process-to-find: transform', (t) => {
    t.transform('process');
    t.end();
});

