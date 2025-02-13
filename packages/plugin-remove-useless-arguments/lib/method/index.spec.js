'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['remove-useless-method/method', plugin],
    ],
});

test('plugin-remove-useless-method: method: report', (t) => {
    t.report('method', `Avoid useless arguments from method 'parseGuard()'`);
    t.end();
});

test('plugin-remove-useless-method: method: transform', (t) => {
    t.transform('method');
    t.end();
});

test('plugin-remove-useless-method: method: no transform: not-class', (t) => {
    t.noTransform('not-class');
    t.end();
});

test('plugin-remove-useless-method: method: no report: class-property', (t) => {
    t.noReport('class-property');
    t.end();
});

test('plugin-remove-useless-method: method: no report: getter', (t) => {
    t.noReport('getter');
    t.end();
});

test('plugin-remove-useless-method: method: no report: private', (t) => {
    t.noReport('private');
    t.end();
});
