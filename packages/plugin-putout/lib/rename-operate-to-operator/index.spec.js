'use strict';

const {createTest} = require('@putout/test');
const renameOperateToOperator = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['putout/rename-operate-to-operator', renameOperateToOperator],
    ],
});

test('plugin-putout: rename-operate-to-operator: report: operate', (t) => {
    t.report('operate', '"operator" should be used instead of "operate"');
    t.end();
});

test('plugin-putout: rename-operate-to-operator: transform: operate', (t) => {
    t.transform('operate');
    t.end();
});

test('plugin-putout: rename-operate-to-operator: no transform: operator', (t) => {
    t.noTransform('operator');
    t.end();
});
