const {test} = require('supertape');

test('plugin-declare-after-require: transform: removed', (t) => {
    t.transform('removed', {
        remove: {
            report: () => {},
            include: () => ['const a = 5'],
            fix: (path) => {
                remove(path);
            },
        },
    });
    t.end();
});
