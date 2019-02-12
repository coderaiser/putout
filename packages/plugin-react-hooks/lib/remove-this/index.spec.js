'use strict';

/* eslint node/no-unpublished-require:0 */
const test = require('@putout/test')(__dirname, {
    'convert-method-assignment-to-declaration': require('.'),
});

test('plugin-react-hooks: convert-method-assignment-to-declaration: report', (t) => {
    t.report('this', `should be used "submit" instead of "this.submit"`);
    t.end();
});

test('plugin-react-hooks: convert-method-assignment-to-declaration: transform', (t) => {
    t.transform('this');
    t.end();
});

