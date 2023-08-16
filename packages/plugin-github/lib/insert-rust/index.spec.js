'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['insert-rust', plugin],
    ],
});

test('packages: insert-rust: report', (t) => {
    t.report('insert-rust', `Install Rust`);
    t.end();
});

test('packages: insert-rust: transform', (t) => {
    t.transform('insert-rust');
    t.end();
});
