'use strict';

const {join} = require('path');

const {stub} = require('supertape');
const {_createNoReport} = require('..');

const test = require('..')(__dirname, {
    'remove-imports': {
        report: () => 'avoid imports',
        match: ({options}) => ({
            'import __imports from "__a"'({__a}) {
                const {cache} = options;
                const {value} = __a;
                
                return cache.has(value);
            },
        }),
        replace: () => ({
            'import __imports from "__a"': '',
        }),
    },
});

test('putout: test: reportWithOptions', (t) => {
    const cache = new Map();
    cache.set('x', 'y');
    
    t.reportWithOptions('remove-import', 'avoid imports', {
        cache,
    });
    t.end();
});

test('putout: test: noReportWithOptions', (t) => {
    const cache = new Map();
    
    t.noReportWithOptions('remove-import', {
        cache,
    });
    t.end();
});

test('putout: test: noReport', (t) => {
    const noReport = _createNoReport({
        dir: join(__dirname, 'fixture'),
        plugins: [
            ['remove-import', {
                report: () => 'hello',
                include: () => ['ImportDeclaration'],
            }],
        ],
    });
    
    const deepEqual = stub();
    const mockTest = {
        deepEqual,
    };
    
    noReport(mockTest, 'remove-import');
    
    const place = {
        message: 'hello',
        position: {
            column: 0,
            line: 1,
        },
        rule: 'remove-import',
    };
    
    const message = 'should not report';
    const expected = [[place], [], message];
    
    t.calledWith(deepEqual, expected);
    t.end();
});

