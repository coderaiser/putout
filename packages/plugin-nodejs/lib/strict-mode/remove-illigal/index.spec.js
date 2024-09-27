'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['remove-illigal-strict-mode', plugin],
    ],
});

test('lib: remove-illigal-strict-mode: report', (t) => {
    t.report('remove-illigal-strict-mode', `Avoid illigal 'use strict'`);
    t.end();
});

test('lib: remove-illigal-strict-mode: transform', (t) => {
    t.transform('remove-illigal-strict-mode');
    t.end();
});
