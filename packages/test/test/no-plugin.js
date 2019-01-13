'use strict';

const test = require('..')(__dirname);

test('test: no plugin: no report', (t) => {
    t.reportCode('const m = 1');
    t.end();
});

