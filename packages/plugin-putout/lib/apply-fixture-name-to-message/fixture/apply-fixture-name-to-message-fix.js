test('flatlint: convert-comma-to-semicolon: no report: array', (t) => {
    t.noReport('array');
    t.end();
});

test('flatlint: convert-comma-to-semicolon: no report: array', (t) => {
    t.noReport('array');
    t.end();
});

test('flatlint: convert-comma-to-semicolon: no report: array', (t) => {
    t.report('array', 'Avoid using...');
    t.end();
});

test('flatlint: convert-comma-to-semicolon: no report: array', (t) => {
    t.transform('array');
    t.end();
});

test('flatlint: convert-comma-to-semicolon: no report: array', (t) => {
    t.noTransform('array');
    t.end();
});

test('packages: add-await-to-progress: report', (t) => {
    t.transform('add-await-to-progress');
});

test('plugin-putout: add-args: transform: compare-places', (t) => {
    t.transform('compare-places');
});

test('plugin-putout: replace-test-message: no report', (t) => {
    t.noReport('transform');
    t.end();
});
