test('plugin-putout: add-traverse-args: transform: convert-traverse-to-scan', (t) => {
    t.transform('convert-traverse-to-scan', {
        'convert-traverse-to-scan': convertTraverseToScan,
    });
    t.end();
});
