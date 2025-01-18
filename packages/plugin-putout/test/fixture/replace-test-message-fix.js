test('plugin-putout: convert-traverse-to-include: transform: traverse', (t) => {
    t.transform('traverse');
    t.end();
});

test('plugin-putout: convert-traverse-to-include: transform: traverse', (t) => {
    t.transform('traverse');
    t.end();
});

test('plugin-putout: rename-operate-to-operator: no transform: operator', (t) => {
    t.noTransform('operator');
    t.end();
});

test('plugin-putout: rename-operate-to-operator: no report: operator', (t) => {
    t.noReport('operator');
    t.end();
});

test('plugin-putout: rename-operate-to-operator: report: operator', (t) => {
    t.report('operator', 'x');
    t.end();
});
