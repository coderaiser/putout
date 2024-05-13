'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');
const addPush = require('../add-push');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['add-path-store', plugin],
    ],
});

test('putout: add-path-store: report', (t) => {
    t.report('add-path-store', `Add 'pathStore' argument to 'traverse'`);
    t.end();
});

test('putout: add-path-store: transform', (t) => {
    t.transform('add-path-store');
    t.end();
});

test('putout: add-path-store: no transform: clash', (t) => {
    t.transform('clash', {
        'add-push': addPush,
    });
    t.end();
});
