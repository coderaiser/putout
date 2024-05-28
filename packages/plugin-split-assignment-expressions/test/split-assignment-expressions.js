'use strict';

const {createTest} = require('@putout/test');
const plugin = require('..');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['split-assignment-expressions', plugin],
    ],
});

test('putout: split-assignment-expressions: report', (t) => {
    t.report('split-assignment-expressions', `Split assignment expressions`);
    t.end();
});

test('putout: split-assignment-expressions: transform', (t) => {
    t.transform('split-assignment-expressions');
    t.end();
});
