'use strict';

const test = require('@putout/test')(__dirname, {
    'convert-logical-expression-to-if-statement': require('..'),
});

test('plugin-convert-logical-expression-to-if-statement: report', (t) => {
    t.report('and', 'Should be used if statement instead of logical expression');
    t.end();
});

test('plugin-convert-logical-expression-to-if-statement: transform: and', (t) => {
    t.transform('and');
    t.end();
});

test('plugin-convert-logical-expression-to-if-statement: transform: or', (t) => {
    t.transform('or');
    t.end();
});

test('plugin-convert-logical-expression-to-if-statement: transform: hard', (t) => {
    t.noTransform('hard');
    t.end();
});

