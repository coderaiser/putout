'use strict';

const {createTest} = require('@putout/test');
const replaceOperateWithOperator = require('.');

const test = createTest(__dirname, {
    printer: 'putout',
    plugins: [
        ['putout/replace-operate-with-operator', replaceOperateWithOperator],
    ],
});

test('plugin-putout: replace-operate-with-operator: report', (t) => {
    t.report('operate', '"operator" should be used instead of "operate"');
    t.end();
});

test('plugin-putout: replace-operate-with-operator: transform', (t) => {
    t.transform('operate');
    t.end();
});
