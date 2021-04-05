'use strict';
'use strict';

const applyDestructuring = require('..');

const test = require('@putout/test')(__dirname, {
    'apply-destructuring': applyDestructuring,
});

test('plugin-apply-destructuring: transform: report', (t) => {
    t.report('array', 'Should be used "Array.at"');
    t.end();
});

test('plugin-apply-destructuring: transform: object', (t) => {
    t.transform('array');
    t.end();
});

