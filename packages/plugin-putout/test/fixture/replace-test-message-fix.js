test('plugin-putout: convert-traverse-to-include: transform', (t) => {
    t.transform('traverse');
    t.end();
});

test('plugin-putout: convert-traverse-to-include: transform', (t) => {
    t.transform('traverse');
    t.end();
});

test('plugin-putout: rename-operate-to-operator: no transform: operator exist', (t) => {
     t.noTransform('operator');
     t.end();
});

test('plugin-putout: rename-operate-to-operator: no report: operator exist', (t) => {
     t.noReport('operator');
     t.end();
});

test('plugin-putout: rename-operate-to-operator: report: operator exist', (t) => {
     t.report('operator');
     t.end();
});
