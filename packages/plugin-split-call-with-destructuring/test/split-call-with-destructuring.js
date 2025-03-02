'use strict';

const {createTest} = require('@putout/test');
const plugin = require('..');

const test = createTest(__dirname, {
    plugins: [
        ['split-call-with-destructuring', plugin],
    ],
});

test('putout: split-call-with-destructuring: report', (t) => {
    t.report('split-call-with-destructuring', `Split call with destructuring`);
    t.end();
});

test('putout: split-call-with-destructuring: transform', (t) => {
    t.transform('split-call-with-destructuring');
    t.end();
});
