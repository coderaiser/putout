'use strict';

const {createTest} = require('@putout/test');
const plugin = require('./index.js');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['convert-npm-to-bun', plugin],
    ],
});

test('putout: plugin-github: convert-npm-to-bun: report', (t) => {
    t.report('convert-npm-to-bun', `Convert npm to bun`);
    t.end();
});

test('putout: plugin-github: convert-npm-to-bun: transform', (t) => {
    t.transform('convert-npm-to-bun');
    t.end();
});

test('putout: plugin-github: convert-npm-to-bun: no transform: empty-steps', (t) => {
    t.noTransform('empty-steps');
    t.end();
});

test('putout: plugin-github: convert-npm-to-bun: no transform: no-install', (t) => {
    t.noTransform('no-install');
    t.end();
});
