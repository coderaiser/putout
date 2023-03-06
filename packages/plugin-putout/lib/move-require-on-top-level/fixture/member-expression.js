const declare = require('@putout/plugin-declare');

test('merge duplicate imports: transform: tape: declare', (t) => {
    t.transform('tape', {
        'tape/declare': tape.rules.declare,
    });
    t.end();
});
