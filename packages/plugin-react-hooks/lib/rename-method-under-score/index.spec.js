'use strict';

const {createTest} = require('@putout/test');
const renameMethodUnderScore = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['rename-method-under-score', renameMethodUnderScore],
    ],
});

test('plugin-react-hooks: rename-method-under-score: report: method', (t) => {
    t.report('method', `name of method "_submit" should not start from under score`);
    t.end();
});

test('plugin-react-hooks: rename-method-unuder-score: transform: method', (t) => {
    t.transform('method');
    t.end();
});
