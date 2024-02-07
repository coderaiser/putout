'use strict';

const {join} = require('path');

const montag = require('montag');
const tryCatch = require('try-catch');
const {stub} = require('supertape');
const {template} = require('putout');

const {
    _createNoReport,
    _createNoReportAfterTransform,
    _createNoReportAfterTransformWithOptions,
} = require('..');

const test = require('..')(__dirname, {
    'remove-imports': {
        report: () => 'avoid imports',
        match: ({options}) => ({
            'import __imports from "__a"'({__a}) {
                const {cache} = options;
                
                if (!cache)
                    return true;
                
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

test('putout: test: noReportAfterTransform', (t) => {
    t.noReportAfterTransform('remove-import');
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
    
    const expected = [
        [place],
        [],
        message,
    ];
    
    t.calledWith(deepEqual, expected);
    t.end();
});

test('putout: test: noReportAfterTransform: internal', (t) => {
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
    
    const expected = [
        [place],
        [],
        message,
    ];
    
    t.calledWith(deepEqual, expected);
    t.end();
});

test('putout: test: noReportAfterTransformWithOptions: internal', (t) => {
    const dir = join(__dirname, 'fixture');
    const plugins = [
        ['declare', {
            report: ({message}) => message,
            fix: ({path}) => {
                const programPath = path.scope.getProgramParent().path;
                programPath.node.body.unshift(template.ast('import {join} from "path"'));
            },
            traverse: ({push, options}) => ({
                'join(__a, __b)': (path) => {
                    const {message} = options;
                    
                    push({
                        path,
                        message,
                    });
                },
            }),
        }],
    ];
    
    const options = {
        plugins,
    };
    
    const noReportAfterTransformWithOptions = _createNoReportAfterTransformWithOptions(dir, options);
    const deepEqual = stub();
    
    const mockTest = {
        deepEqual,
    };
    
    noReportAfterTransformWithOptions(mockTest, 'no-report-after-transform', {
        message: 'world',
    });
    
    const place = {
        message: 'world',
        position: {
            column: 0,
            line: 1,
        },
        rule: 'declare',
    };
    
    const message = 'should not report after transform';
    
    const expected = [
        [place],
        [],
        message,
    ];
    
    t.calledWith(deepEqual, expected);
    t.end();
});

test('putout: test: report: with one argument', async (t) => {
    const {default: strip} = await import('strip-ansi');
    const cache = new Map();
    
    cache.set('x', 'y');
    
    const [error] = tryCatch(t.report, 'remove-import');
    const expected = '\n' + montag`
          > 1 | report(name: string, message: string): Operator
              | ^ ☝️ Looks like you forget to pass the 'message' for 'report()' operator
              ╔══
              ║    name = "remove-import"
              ║    message = undefined
              ╚══
      ` +
        '\n';
    
    t.equal(strip(error.message), expected);
    t.end();
}, {
    checkAssertionsCount: false,
});

const testEmptyReport = require('..')(__dirname, {
    'remove-imports': {
        report: () => '',
        match: ({options}) => ({
            'import __imports from "__a"'({__a}) {
                const {cache} = options;
                
                if (!cache)
                    return true;
                
                const {value} = __a;
                
                return cache.has(value);
            },
        }),
        replace: () => ({
            'import __imports from "__a"': '',
        }),
    },
});

testEmptyReport('putout: test: report: with message empty string', (t) => {
    const cache = new Map();
    
    cache.set('x', 'y');
    
    const [error] = tryCatch(t.report, 'remove-import', '');
    
    t.notOk(error);
    t.end();
}, {
    checkAssertionsCount: false,
});
