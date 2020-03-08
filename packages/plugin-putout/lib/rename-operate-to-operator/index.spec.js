'use strict';

const test = require('@putout/test')(__dirname, {
    'putout/rename-operate-to-operator': require('.'),
});

test('plugin-putout: rename-operate-to-operator: report', (t) => {
    t.report('operate', '"operator" should be used instead of "operate"');
    t.end();
});

test('plugin-putout: rename-operate-to-operator: transform', (t) => {
    t.transform('operate');
    t.end();
});

test('plugin-putout: rename-operate-to-operator: no transform: operator exist', (t) => {
    t.noTransform('operator');
    t.end();
});

