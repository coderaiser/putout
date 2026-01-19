import {stripVTControlCharacters} from 'node:util';
import montag from 'montag';
import {tryCatch} from 'try-catch';
import {stub} from 'supertape';
import putout from 'putout';
import * as variables from '@putout/plugin-variables';
import {
    createTest,
    _createNoReport,
    _createNoReportAfterTransform,
    _createNoReportAfterTransformWithOptions,
} from '../lib/test.js';

const removeUnusedVariables = variables.rules['remove-unused'];
const {template} = putout;

const test = createTest(import.meta.url, {
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

test('putout: test: no report after transform: remove-import', (t) => {
    t.noReportAfterTransform('remove-import');
    t.end();
});

test('putout: test: noReportCode', (t) => {
    t.noReportCode('const a = 5');
    t.end();
});

test('putout: test: no report with options: remove-import', (t) => {
    const cache = new Map();
    
    t.noReportWithOptions('remove-import', {
        cache,
    });
    t.end();
});

test('putout: test: report: plugins', (t) => {
    const expected = [
        `'x' is defined but never used`,
        'avoid imports',
    ];
    
    t.report('remove-import', expected, {
        removeUnusedVariables,
    });
    t.end();
});

test('putout: test: noReport', (t) => {
    const dir = new URL('fixture', import.meta.url).pathname;
    const plugins = [
        ['remove-import', {
            report: () => 'hello',
            include: () => ['ImportDeclaration'],
        }],
    ];
    
    const options = {
        plugins,
    };
    
    const initReport = _createNoReport(dir, {lint: putout}, options);
    const deepEqual = stub();
    
    const mockTest = {
        deepEqual,
    };
    
    const noReport = initReport(mockTest);
    
    noReport('remove-import');
    
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

test('putout: test: noReport: addons', (t) => {
    const dir = new URL('fixture', import.meta.url).pathname;
    const removeImport1 = ['remove-import1', {
        report: () => 'hello',
        include: () => ['ImportDeclaration'],
    }];
    
    const removeImport2 = ['remove-import2', {
        report: () => 'hello',
        include: () => ['ImportDeclaration'],
    }];
    
    const plugins = [removeImport1];
    
    const options = {
        plugins,
    };
    
    const initNoReport = _createNoReport(dir, {lint: putout}, options);
    const deepEqual = stub();
    
    const mockTest = {
        deepEqual,
    };
    
    const noReport = initNoReport(mockTest);
    
    noReport('remove-import', [removeImport2]);
    
    const place1 = {
        message: 'hello',
        position: {
            column: 0,
            line: 1,
        },
        rule: 'remove-import1',
    };
    
    const place2 = {
        message: 'hello',
        position: {
            column: 0,
            line: 1,
        },
        rule: 'remove-import2',
    };
    
    const message = 'should not report';
    
    const expected = [
        [place1, place2],
        [],
        message,
    ];
    
    t.calledWith(deepEqual, expected);
    t.end();
});

test('putout: test: noReportAfterTransform: internal', (t) => {
    const dir = new URL('fixture', import.meta.url).pathname;
    
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
    
    const noReportAfterTransform = _createNoReportAfterTransform(dir, {lint: putout}, options);
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
    const dir = new URL('fixture', import.meta.url).pathname;
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
    
    const noReportAfterTransformWithOptions = _createNoReportAfterTransformWithOptions(dir, {lint: putout}, options);
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

test('putout: test: report: with one argument', (t) => {
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
    
    t.equal(stripVTControlCharacters(error.message), expected);
    t.end();
}, {
    checkAssertionsCount: false,
});

const testEmptyReport = createTest(import.meta.url, {
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
