'use strict';

const {join} = require('path');

const {stub} = require('supertape');
const {template} = require('putout');

const {
    _createNoReport,
    _createNoReportAfterTransform,
} = require('..');

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
    const dir = join(__dirname, 'fixture');
    
    const plugins = [
        ['remove-import', {
            report: () => 'hello',
            include: () => ['ImportDeclaration'],
        }],
    ];
    const options = {
        plugins,
    };
    const noReport = _createNoReport(dir, options);
    
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

test('putout: test: noReportAfterTransform', (t) => {
    const dir = join(__dirname, 'fixture');
    const plugins = [
        ['declare', {
            report: () => 'hello',
            replace: () => ({
                'join(__a, __b)': (vars, path) => {
                    if (path.scope.hasBinding('join'))
                        return;
                    
                    const programPath = path.scope.getProgramParent().path;
                    programPath.node.body.unshift(template.ast('import {join} from "path"'));
                    
                    return path;
                },
            }),
        }],
    ];
    const options = {
        plugins,
    };
    const noReportAfterTransform = _createNoReportAfterTransform(dir, options);
    
    const deepEqual = stub();
    const mockTest = {
        deepEqual,
    };
    
    noReportAfterTransform(mockTest, 'no-report-after-transform');
    
    const place = {
        message: 'hello',
        position: {
            column: 0,
            line: 1,
        },
        rule: 'declare',
    };
    
    const message = 'should not report after transform';
    const expected = [[place], [], message];
    
    t.calledWith(deepEqual, expected);
    t.end();
});

