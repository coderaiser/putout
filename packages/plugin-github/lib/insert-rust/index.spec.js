'use strict';

const plugin = require('./index.js');
const {createTest} = require('@putout/test');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['insert-rust', plugin],
    ],
});

test('putout: plugin-github: insert-rust: report', (t) => {
    t.report('insert-rust', `Install Rust`);
    t.end();
});

test('putout: plugin-github: insert-rust: transform', (t) => {
    t.transform('insert-rust');
    t.end();
});
