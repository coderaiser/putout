test('plugin-putout: add-traverse-args: no report: convert-traverse-to-scan', (t) => {
    t.transform('convert-traverse-to-scan', {
        'convert-traverse-to-scan': convertTraverseToScan,
    });
    t.end();
});
