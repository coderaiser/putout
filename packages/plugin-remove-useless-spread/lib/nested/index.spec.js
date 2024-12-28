'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['nested', plugin],
    ],
});

test('@putout/plugin-remove-useless-spread: nested: report', (t) => {
    t.report('nested', `Remove useless nested spread`);
    t.end();
});

test('@putout/plugin-remove-useless-spread: nested: transform', (t) => {
    t.transform('nested');
    t.end();
});

test('@putout/plugin-remove-useless-spread: nested: no transform: call', (t) => {
    t.noTransform('call');
    t.end();
});
