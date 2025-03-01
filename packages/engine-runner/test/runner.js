'use strict';

const process = require('node:process');
const montag = require('montag');
const tryCatch = require('try-catch');
const {test, stub} = require('supertape');
const putout = require('putout');
const mockRequire = require('mock-require');
const {loadPlugins} = require('@putout/engine-loader');

const {readFixtures} = require('./fixture');
const {runPlugins} = require('..');
const noop = () => {};
const {reRequire, stopAll} = mockRequire;
const {parse} = putout;

const fixture = readFixtures([
    'import',
    'no-parent',
    'shebang',
    'shebang-fix',
    'debug',
]);

const {assign} = Object;

test('putout: runner: run plugins', (t) => {
    const result = putout(fixture.import, {
        runPlugins,
        plugins: [
            'remove-unused-variables',
            'esm',
        ],
    });
    
    const expected = '\n';
    
    t.equal(result.code, expected);
    t.end();
});

test('putout: runner: run plugins: disable, using "off"', (t) => {
    const result = putout(fixture.import, {
        runPlugins,
        rules: {
            'remove-unused-variables': 'off',
            'remove-empty': 'off',
        },
        plugins: [
            'remove-unused-variables',
            'remove-empty',
        ],
    });
    
    const expected = fixture.import;
    
    t.deepEqual(result.code, expected);
    t.end();
});

test('putout: runner: filter: options', (t) => {
    const addVar = {
        report: () => '',
        fix: stub(),
        include: () => ['debugger'],
        filter: (path, {options}) => options.ok,
    };
    
    const code = 'debugger';
    
    const {places} = putout(code, {
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
        rules: {
            'add-variable': ['on', {
                ok: true,
            }],
        },
    });
    
    const expected = [{
        rule: 'add-variable',
        message: '',
        position: {
            line: 1,
            column: 0,
        },
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: runner: filter: options: no filter call', (t) => {
    const addVar = {
        report: () => '',
        fix: stub(),
        include: () => ['debugger'],
        filter: (path, {options}) => options.ok,
    };
    
    const code = 'debugger';
    
    const {places} = putout(code, {
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
        rules: {
            'add-variable': ['on', {
                ok: false,
            }],
        },
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: runner: plugins: replace', (t) => {
    const addVar = {
        report: () => '',
        replace: () => ({
            debugger: 'const a = 1',
        }),
    };
    
    const {code} = putout('debugger', {
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    const expected = 'const a = 1;\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: plugins: replace: a couple', (t) => {
    const addVar = {
        report: () => '',
        replace: () => ({
            'debugger': 'const a = 1',
            'var x = 1': 'const x = 1',
        }),
    };
    
    const {code} = putout('var x = 1', {
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    const expected = 'const x = 1;\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: plugins: replace: remove', (t) => {
    const rmDebugger = {
        report: () => '',
        replace: () => ({
            debugger: '',
        }),
    };
    
    const {code} = putout('debugger', {
        runPlugins,
        plugins: [{
            'rm-debugger': rmDebugger,
        }],
    });
    
    const expected = '\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: plugins: replace: remove: exclude', (t) => {
    const rmDebugger = {
        report: () => '',
        replace: () => ({
            debugger: '',
        }),
    };
    
    const {code} = putout('debugger', {
        runPlugins,
        rules: {
            'rm-debugger': ['on', {
                exclude: 'debugger',
            }],
        },
        plugins: [{
            'rm-debugger': rmDebugger,
        }],
    });
    
    const expected = 'debugger;\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: plugins: replace: template', (t) => {
    const varToConst = {
        report: () => '',
        replace: () => ({
            'var __a = __b': 'const __a = __b',
        }),
    };
    
    const {code} = putout('var hello = 5', {
        fixCount: 1,
        runPlugins,
        plugins: [{
            'var-to-const': varToConst,
        }],
    });
    
    const expected = 'const hello = 5;\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: plugins: replace: template: a couple vars', (t) => {
    const varToConst = {
        report: () => '',
        replace: () => ({
            'const __a = __b': 'const __b = __a',
            'debugger': '',
        }),
    };
    
    const {code} = putout('debugger; const hello = world', {
        fixCount: 1,
        runPlugins,
        plugins: [{
            'var-to-const': varToConst,
        }],
    });
    
    const expected = 'const world = hello;\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: plugins: replace: template: array', (t) => {
    const varToConst = {
        report: () => '',
        replace: () => ({
            'const __a = __b[0]': 'const [__a] = __b',
        }),
    };
    
    const {code} = putout('const first = elements[0]', {
        fixCount: 1,
        runPlugins,
        plugins: [{
            'var-to-const': varToConst,
        }],
    });
    
    const expected = 'const [first] = elements;\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: plugins: replace: template: identifier', (t) => {
    const varToConst = {
        report: () => '',
        replace: () => ({
            '!!__a': '__a',
        }),
    };
    
    const {code} = putout('if (!!y) fn()', {
        fixCount: 1,
        runPlugins,
        plugins: [{
            'var-to-const': varToConst,
        }],
    });
    
    const expected = 'if (y)\n    fn();\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: plugins: replace: template: ifCondition', (t) => {
    const varToConst = {
        report: () => '',
        replace: () => ({
            'if (!!__a) __b': 'if (__a) __b',
        }),
    };
    
    const {code} = putout('if (!!y) fn()', {
        fixCount: 1,
        runPlugins,
        plugins: [{
            'var-to-const': varToConst,
        }],
    });
    
    const expected = montag`
        if (y)
            fn();
    
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: plugins: replace: template: ifCondition: body', (t) => {
    const varToConst = {
        report: () => '',
        replace: () => ({
            'if (!!__a) __b': 'if (__a) __b',
        }),
    };
    
    const {code} = putout('if (!!y) {fn()}', {
        printer: 'putout',
        fixCount: 1,
        runPlugins,
        plugins: [{
            'var-to-const': varToConst,
        }],
    });
    
    const expected = montag`
        if (y) {
            fn();
        }\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: plugins: replace: template: object pattern', (t) => {
    const varToConst = {
        report: () => '',
        replace: () => ({
            'const __a = __b.__a': 'const {__a} = __b',
        }),
    };
    
    const {code} = putout('const hello = world.hello', {
        fixCount: 1,
        runPlugins,
        plugins: [{
            'var-to-const': varToConst,
        }],
    });
    
    const expected = 'const {hello} = world;\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: plugins: replace: template: infinite loop', (t) => {
    const varToConst = {
        report: () => '',
        replace: () => ({
            'const __a = __b': 'let __a = __b',
            'let __a = __b': 'const __b = __a',
        }),
    };
    
    const {code} = putout('const hello = world', {
        fixCount: 1,
        runPlugins,
        plugins: [{
            'var-to-const': varToConst,
        }],
    });
    
    const expected = 'const world = hello;\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: plugins: replace: template: same', (t) => {
    const applyToSpread = {
        report: () => '',
        replace: () => ({
            'console.log.apply(/*hello*/ console, lines)': 'console.log(...lines)',
        }),
    };
    
    const {code} = putout('console.log(...lines)', {
        fixCount: 1,
        runPlugins,
        plugins: [{
            'apply-to-spread': applyToSpread,
        }],
    });
    
    const expected = 'console.log(...lines);\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: plugins: replace: template: linked literal node', (t) => {
    const applyToSpread = {
        report: () => '',
        replace: () => ({
            'import __a from "__b"': 'const __a = require("__b")',
        }),
    };
    
    const {code} = putout('import hello from "world"', {
        fixCount: 1,
        runPlugins,
        plugins: [{
            'apply-to-spread': applyToSpread,
        }],
    });
    
    const expected = `const hello = require('world');\n`;
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: plugins: replace: template: function: __imports', (t) => {
    const applyToSpread = {
        report: () => '',
        replace: () => ({
            'import __imports from "__a"': ({__imports, __a}) => {
                let result = 'const {\n';
                
                for (const {imported} of __imports) {
                    result += `${imported.name},`;
                }
                
                result += `\n} = require("${__a.value}");`;
                
                return result;
            },
        }),
    };
    
    const {code} = putout('import {hello} from "world"', {
        runPlugins,
        plugins: [{
            'convert-esm-to-commonjs': applyToSpread,
        }],
    });
    
    const expected = `const {hello} = require('world');\n`;
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: plugins: replace: template: function: __args', (t) => {
    const applyToSpread = {
        report: () => '',
        replace: () => ({
            'function __a(__args){}': 'const __a = (__args) => {}',
        }),
    };
    
    const {code} = putout('function hello(a, b, c){}', {
        runPlugins,
        plugins: [{
            'convert-to-arrow': applyToSpread,
        }],
    });
    
    const expected = 'const hello = (a, b, c) => {};\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: plugins: replace: template: expression', (t) => {
    const rm = {
        report: () => '',
        replace: () => ({
            'if (!!__a) __b': 'if (__a) __b',
        }),
    };
    
    const {code} = putout(`if (!!true) {console.log('sh');}`, {
        runPlugins,
        printer: 'putout',
        plugins: [
            ['rm', rm],
        ],
    });
    
    const expected = montag`
        if (true) {
            console.log('sh');
        }\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: plugins: replace: template: filter', (t) => {
    const rm = {
        report: () => '',
        filter: () => false,
        replace: () => ({
            'return x': 'return',
        }),
    };
    
    const {code} = putout('return x', {
        runPlugins,
        plugins: [{
            rm,
        }],
    });
    
    const expected = 'return x;\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: plugins: replace: path', (t) => {
    const rm = {
        report: () => '',
        replace: () => ({
            'return x': (vars, path) => {
                path
                    .getPrevSibling()
                    .remove();
                return 'return x';
            },
        }),
    };
    
    const {code} = putout('var y; return x', {
        runPlugins,
        plugins: [{
            rm,
        }],
    });
    
    const expected = 'return x;\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: plugins: replace: match', (t) => {
    const rm = {
        report: () => '',
        match: () => ({
            'const __array = __': ({__array}) => {
                const {elements} = __array;
                return !elements.find(Boolean);
            },
        }),
        replace: () => ({
            'const __array = __x': '',
        }),
    };
    
    const {code} = putout('const [] = array', {
        runPlugins,
        plugins: [{
            rm,
        }],
    });
    
    const expected = '\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: plugins: replace: match: not found', (t) => {
    const rm = {
        report: () => '',
        match: () => ({
            'const [,] = __': ({__array}) => {
                const {elements} = __array;
                return !elements.find(Boolean);
            },
        }),
        replace: () => ({
            'const __array = __x': '',
        }),
    };
    
    const {code} = putout('const [] = array', {
        runPlugins,
        plugins: [{
            rm,
        }],
    });
    
    const expected = '\n';
    
    t.equal(code, expected);
    t.end();
});

module.exports.replace = () => ({
    'const __array = __': '',
    'const {} = __': '',
    '([]) => __a': '() => __a',
    '({}) => __a': '() => __a',
});

test('putout: runner: root vars: no parent', (t) => {
    const result = putout(fixture.noParent, {
        plugins: ['remove-unused-variables'],
    });
    
    const expected = {
        code: '\n',
        places: [],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: runner: parser: no loc', (t) => {
    const rmLoc = {
        report: () => '',
        fix: () => {},
        traverse: ({push}) => ({
            Program(path) {
                path.node.loc = null;
                push(path);
            },
        }),
    };
    
    const {places} = putout('', {
        plugins: [{
            'rm-loc': rmLoc,
        }],
    });
    
    const expected = [{
        rule: 'rm-loc',
        message: '',
        position: {
            line: 0,
            column: 0,
        },
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: runner: shebang', (t) => {
    const {code} = putout(fixture.shebang, {
        plugins: ['remove-unused-variables'],
    });
    
    const expected = fixture.shebangFix;
    
    t.deepEqual(code, expected);
    t.end();
});

test('putout: runner: debug', (t) => {
    const {DEBUG} = process.env;
    
    process.env.DEBUG = 'putout:runner:fix';
    
    const debugFn = stub();
    
    debugFn.enabled = true;
    const debug = stub().returns(debugFn);
    
    mockRequire('debug', debug);
    reRequire('../lib/run-fix');
    
    const {runPlugins} = reRequire('..');
    const putout = reRequire('putout');
    
    const {code} = putout(fixture.debug, {
        fix: true,
        runPlugins,
        plugins: ['remove-unused-variables'],
    });
    
    const expected = '\n';
    
    process.env.DEBUG = DEBUG;
    
    stopAll();
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: debug: replace', (t) => {
    const {DEBUG} = process.env;
    
    process.env.DEBUG = 'putout:runner:fix';
    
    const debugFn = stub();
    
    debugFn.enabled = true;
    const debug = stub().returns(debugFn);
    
    mockRequire('debug', debug);
    reRequire('../lib/replace');
    
    const {runPlugins} = reRequire('..');
    const putout = reRequire('putout');
    
    putout('debugger', {
        fix: true,
        runPlugins,
        plugins: ['remove-debugger'],
    });
    
    const expected = [`debugger -> ''\n`];
    
    process.env.DEBUG = DEBUG;
    
    stopAll();
    
    t.calledWith(debugFn, expected);
    t.end();
});

test('putout: runner: traverse: no visitors', (t) => {
    const noVisitors = {
        report: () => '',
        fix: stub(),
        traverse: () => {},
    };
    
    const code = 'debugger';
    
    const [error] = tryCatch(putout, code, {
        runPlugins,
        plugins: [
            ['no-visitors', noVisitors],
        ],
    });
    
    t.equal(error.message, '☝️ Visitors cannot be empty in "no-visitors"');
    t.end();
});

test('putout: runner: nested: options', (t) => {
    const passedOptions = {
        include: [],
        exclude: [],
    };
    
    const first = {
        report: () => '',
        fix: stub(),
        traverse: ({push, options}) => {
            assign(passedOptions, options);
            
            return {
                debugger: push,
            };
        },
    };
    
    const code = 'debugger';
    
    const nested = {
        rules: {
            first,
        },
    };
    
    const options = {
        hello: 'world',
    };
    
    putout(code, {
        runPlugins,
        rules: {
            'nested/first': ['on', options],
        },
        plugins: [
            ['nested', nested],
        ],
    });
    
    t.deepEqual(passedOptions, options);
    t.end();
});

test('putout: runner: traverse: no return fn', (t) => {
    const noReturnFn = {
        traverse: () => ({
            'async (__a) => __b': 'async ({process}) => __b',
        }),
    };
    
    const code = 'async (a) => a';
    
    const [error] = tryCatch(putout, code, {
        runPlugins,
        plugins: [
            ['no-return-fn', noReturnFn],
        ],
    });
    
    const expected = '☝️ Looks like provided visitor is not a function: "async ({process}) => __b". More on using Traverser: https://git.io/JqcMn';
    
    t.equal(error.message, expected);
    t.end();
});

test('putout: runner: traverse: Program: exit + exclude', (t) => {
    const noReturnFn = {
        report: () => '',
        exclude: () => 'const __a = __b',
        fix: (path) => path.node.body = [],
        traverse: ({push}) => ({
            Program: {
                exit(path) {
                    push(path);
                },
            },
        }),
    };
    
    const code = 'async (a) => a';
    
    const result = putout(code, {
        runPlugins,
        fix: true,
        plugins: [
            ['no-return-fn', noReturnFn],
        ],
    });
    
    t.equal(result.code, '\n');
    t.end();
});

test('putout: runner: fix: crawl', (t) => {
    const source = montag`
        import {readFile} from 'fs/promises';
        import {writeFile} from 'fs/promises';
        
        log(readFile, writeFile);
    `;
    
    const {code} = putout(source, {
        runPlugins,
        rules: {
            'esm': 'off',
            'esm/merge-duplicate-imports': 'on',
        },
        plugins: ['declare', 'esm'],
    });
    
    const expected = montag`
        import {readFile, writeFile} from 'fs/promises';
        
        log(readFile, writeFile);
    
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: duplication: traverse + include', (t) => {
    const duplicator = {
        report: () => '',
        include: () => 'debugger',
        traverse: ({push}) => ({
            debugger: push,
        }),
    };
    
    const code = 'debugger';
    
    const {places} = putout(code, {
        runPlugins,
        fix: false,
        plugins: [
            ['duplicator', duplicator],
        ],
    });
    
    const expected = [{
        message: '',
        position: {
            column: 0,
            line: 1,
        },
        rule: 'duplicator',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: runner: duplication: find + traverse', (t) => {
    const duplicator = {
        report: () => '',
        include: () => 'debugger',
        find: (ast, {traverse, push}) => {
            traverse(ast, {
                DebuggerStatement: push,
            });
        },
        traverse: ({push}) => ({
            debugger: push,
        }),
    };
    
    const code = 'debugger';
    
    const {places} = putout(code, {
        runPlugins,
        fix: false,
        plugins: [
            ['duplicator', duplicator],
        ],
    });
    
    const expected = [{
        message: '',
        position: {
            column: 0,
            line: 1,
        },
        rule: 'duplicator',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: runner: runPlugins', (t) => {
    const duplicator = {
        report: () => '',
        find: (ast, {traverse, push}) => {
            traverse(ast, {
                DebuggerStatement: push,
            });
        },
    };
    
    const code = 'debugger';
    const ast = parse(code);
    
    const plugins = loadPlugins({
        pluginNames: [
            ['duplicator', duplicator],
        ],
    });
    
    const places = runPlugins({
        ast,
        fix: false,
        plugins,
    });
    
    const expected = [{
        message: '',
        position: {
            column: 0,
            line: 1,
        },
        rule: 'duplicator',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: runner: runPlugins: override traverse', (t) => {
    const duplicator = {
        report: () => '',
        find: (ast, {traverse, push}) => {
            traverse(ast, {
                DebuggerStatement: push,
            });
        },
    };
    
    const code = 'debugger';
    const ast = parse(code);
    
    const plugins = loadPlugins({
        pluginNames: [
            ['duplicator', duplicator],
        ],
    });
    
    const traverse = stub();
    
    runPlugins({
        traverse,
        ast,
        fix: false,
        plugins,
    });
    
    t.calledCount(traverse, 2);
    t.end();
});

test('putout: runner: runPlugins: find: reason', (t) => {
    const duplicator = {
        report: () => '',
        find: (ast, {traverse}) => {
            traverse(ast, {
                DebuggerStatement: () => {
                    throw Error('x');
                },
            });
        },
    };
    
    const code = 'debugger';
    const ast = parse(code);
    
    const plugins = loadPlugins({
        pluginNames: [
            ['duplicator', duplicator],
        ],
    });
    
    const [error] = tryCatch(runPlugins, {
        ast,
        fix: false,
        plugins,
    });
    
    t.equal(error.reason, 'traverse');
    t.end();
});

test('putout: runner: runPlugins: traverse: reason', (t) => {
    const duplicator = {
        report: () => '',
        fix: noop,
        traverse: () => ({
            DebuggerStatement: () => {
                throw Error('x');
            },
        }),
    };
    
    const code = 'debugger';
    const ast = parse(code);
    
    const plugins = loadPlugins({
        pluginNames: [
            ['duplicator', duplicator],
        ],
    });
    
    const [error] = tryCatch(runPlugins, {
        ast,
        fix: false,
        plugins,
    });
    
    t.equal(error.reason, 'traverse');
    t.end();
});

test('putout: runner: runPlugins: fix: reason', (t) => {
    const duplicator = {
        report: () => '',
        fix: () => {
            throw Error('x');
        },
        traverse: ({push}) => ({
            DebuggerStatement: (path) => {
                push(path);
            },
        }),
    };
    
    const code = 'debugger';
    const ast = parse(code);
    
    const plugins = loadPlugins({
        pluginNames: [
            ['duplicator', duplicator],
        ],
    });
    
    const [error] = tryCatch(runPlugins, {
        ast,
        fix: true,
        plugins,
    });
    
    t.equal(error.reason, 'fix');
    t.end();
});
