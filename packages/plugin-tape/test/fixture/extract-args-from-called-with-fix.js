import {test} from 'supertape';

const args = [
    coverage, {
        skipFull: false,
    },
];

t.calledWith(report, args);

test('abc: def', (t) => {
    const args = [];
    
    t.calledWith(report, [
        coverage, {
            skipFull: false,
        },
    ]);
    t.end();
});

test('abc: def', (t) => {
    const args = [
        ['tape', 'test.js'], {
            exit,
        },
    ];
    
    t.calledWith(executeFn, args);
    t.end();
});
