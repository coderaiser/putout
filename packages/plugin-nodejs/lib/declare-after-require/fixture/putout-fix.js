const {
    operator: operator
} = require('putout');

const {test} = require('supertape');

const {
    remove
} = operator;

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
