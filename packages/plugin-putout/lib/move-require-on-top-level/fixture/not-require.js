test('plugin-declare-after-require: transform: removed', (t) => {
    t.transform('removed', {
        remove: {
            report: () => {},
            include: () => ['const a = 5'],
            fix: (path) => {
                path.remove(path);
            }
        }
    });
    t.end();
});
