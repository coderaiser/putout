'use strict';

const {once} = require('node:events');
const montag = require('montag');
const {test, stub} = require('supertape');
const tryCatch = require('try-catch');
const {createProgress} = require('@putout/engine-runner/progress');

const putout = require('..');
const {readFixtures} = require('./fixture');

const noop = () => {};

const fixture = readFixtures([
    'await-outside-func',
    'comment',
    'comment-fix',
    'debugger',
    'no-parent',
    'root-vars',
    'import',
    'export-default-declaration',
    'export-default-declaration-fix',
    'shebang',
    'shebang-fix',
    'shebang-recast',
    'shebang-recast-fix',
    'shebang-printer',
    'shebang-printer-fix',
    'strict-mode',
    'strict-mode-fix',
    'strict-mode-fix-count',
    'fix-count',
    'fix-count-fix',
    'recast-destructuring-assign',
    'recast-destructuring-assign-fix',
    'flow',
    'typescript',
    'overlap',
    'overlap-fix',
    'jsx',
    'no-recast',
    'no-recast-fix',
    'printer-putout',
    'printer-putout-fix',
    'printer-putout-options',
    'printer-putout-options-fix',
]);

test('putout: no vars', (t) => {
    const result = putout('');
    
    const expected = {
        code: '\n',
        places: [],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: no vars: nested', (t) => {
    const result = putout.putout('');
    
    const expected = {
        code: '\n',
        places: [],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: root vars', (t) => {
    const result = putout(fixture.rootVars, {
        plugins: ['remove-unused-variables'],
    });
    
    const expected = {
        code: fixture.rootVars,
        places: [],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: root vars: no parent', (t) => {
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

test('putout: await outside function', (t) => {
    const result = putout(fixture.awaitOutsideFunc, {
        plugins: ['remove-unused-variables'],
    });
    
    const expected = {
        code: '\n',
        places: [],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: run plugins', (t) => {
    const result = putout(fixture.import, {
        plugins: [
            'remove-unused-variables',
            'esm',
        ],
    });
    
    const expected = '\n';
    
    t.equal(result.code, expected);
    t.end();
});

test('putout: run plugins: disable, using "off"', (t) => {
    const result = putout(fixture.import, {
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

test('putout: fix count', (t) => {
    const result = putout(fixture.fixCount, {
        fixCount: 3,
        plugins: [
            'apply-destructuring',
            'merge-destructuring-properties',
        ],
    });
    
    t.deepEqual(result.code, fixture.fixCountFix);
    t.end();
});

test('putout: comment', (t) => {
    const result = putout(fixture.comment, {
        rules: {
            'nodejs/convert-commonjs-to-esm': 'on',
        },
        plugins: ['nodejs'],
    });
    
    const expected = fixture.commentFix;
    
    t.deepEqual(result.code, expected);
    t.end();
});

test('putout: shebang', (t) => {
    const {code} = putout(fixture.shebang, {
        plugins: ['remove-unused-variables'],
    });
    
    const expected = fixture.shebangFix;
    
    t.deepEqual(code, expected);
    t.end();
});

test('putout: shebang: recast', (t) => {
    const {code} = putout(fixture.shebangRecast, {
        printer: 'recast',
        plugins: ['remove-unused-variables'],
    });
    
    const expected = fixture.shebangRecastFix;
    
    t.deepEqual(code, expected);
    t.end();
});

test('putout: flow', (t) => {
    const {places} = putout(fixture.flow, {
        printer: 'recast',
        plugins: ['remove-unused-variables'],
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: typescript', (t) => {
    const {code} = putout(fixture.typescript, {
        isTS: true,
        plugins: ['remove-unused-variables'],
    });
    
    t.equal(code, '\n');
    t.end();
});

test('putout: shebang: message', (t) => {
    const {places} = putout(fixture.shebang, {
        fixCount: 1,
        plugins: ['remove-unused-variables'],
    });
    
    const {position} = places[0];
    
    const expected = {
        line: 6,
        column: 10,
    };
    
    t.deepEqual(position, expected);
    t.end();
});

test('putout: export default declaration', (t) => {
    const {code} = putout(fixture.exportDefaultDeclaration, {
        plugins: ['remove-unused-variables'],
    });
    
    const expected = fixture.exportDefaultDeclarationFix;
    
    t.deepEqual(code, expected);
    t.end();
});

test('putout: export default declaration: espree', (t) => {
    const {code} = putout(fixture.exportDefaultDeclaration, {
        parser: 'espree',
        plugins: ['remove-unused-variables'],
    });
    
    const expected = fixture.exportDefaultDeclarationFix;
    
    t.deepEqual(code, expected);
    t.end();
});

test('putout: export default declaration: espree: places: shebang', (t) => {
    const {places} = putout(fixture.shebang, {
        parser: 'espree',
        fix: false,
        plugins: ['remove-unused-variables'],
    });
    
    const expected = [{
        rule: 'remove-unused-variables',
        message: `'b' is defined but never used`,
        position: {
            line: 6,
            column: 10,
        },
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: use strict', (t) => {
    const {code} = putout(fixture.strictMode, {
        fixCount: 1,
        plugins: ['remove-unused-variables'],
    });
    
    const expected = fixture.strictModeFix;
    
    t.deepEqual(code, expected);
    t.end();
});

test('putout: use strict: @putout/printer', (t) => {
    const {code} = putout(fixture.shebangPrinter, {
        printer: 'putout',
        fixCount: 1,
        plugins: ['remove-unused-variables'],
    });
    
    const expected = fixture.shebangPrinterFix;
    
    t.deepEqual(code, expected);
    t.end();
});

test('putout: use strict: fixCount', (t) => {
    const {code} = putout(fixture.strictMode, {
        fixCount: 10,
        plugins: ['remove-unused-variables'],
    });
    
    const expected = fixture.strictModeFixCount;
    
    t.deepEqual(code, expected);
    t.end();
});

test('putout: use strict: no fix', (t) => {
    const {code} = putout(fixture.strictMode, {
        fix: false,
    });
    
    const expected = fixture.strictMode;
    
    t.deepEqual(code, expected);
    t.end();
});

test('putout: traverse: shebang', (t) => {
    const findDebugger = {
        report: () => '',
        fix: stub(),
        include: () => ['debugger'],
    };
    
    const code = montag`
        #!/usr/bin/env node
        debugger;
    `;
    
    const {places} = putout(code, {
        plugins: [{
            'find-debugger': findDebugger,
        }],
    });
    
    const expected = [{
        rule: 'find-debugger',
        message: '',
        position: {
            line: 2,
            column: 0,
        },
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: no loc', (t) => {
    const addVar = {
        report: () => '',
        fix: () => {},
        find: (ast, {traverse}) => {
            const places = [];
            
            traverse(ast, {
                Program(path) {
                    path.node.loc = null;
                    places.push(path);
                },
            });
            
            return places;
        },
    };
    
    const {places} = putout('', {
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    const expected = [{
        rule: 'add-variable',
        message: '',
        position: {
            line: 0,
            column: 0,
        },
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: plugin: find: no return', (t) => {
    const addVar = {
        report: () => '',
        fix: () => {},
        find: (ast, {push, traverse}) => {
            traverse(ast, {
                Program(path) {
                    path.node.loc = null;
                    push(path);
                },
            });
        },
    };
    
    const {places} = putout('', {
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    const expected = [{
        rule: 'add-variable',
        message: '',
        position: {
            line: 0,
            column: 0,
        },
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: plugin: return push in traverse', (t) => {
    const addVar = {
        report: () => '',
        fix: () => {},
        find: (ast, {push, traverse}) => {
            traverse(ast, {
                Program(path) {
                    path.node.loc = null;
                    return push(path);
                },
            });
        },
    };
    
    const {places} = putout('', {
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    const expected = [{
        rule: 'add-variable',
        message: '',
        position: {
            line: 0,
            column: 0,
        },
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: recast destructuring assign', (t) => {
    const result = putout(fixture.recastDestructuringAssign, {
        printer: 'recast',
        plugins: [
            ['apply-destructuring', {
                report: noop,
                replace: () => ({
                    'const __a = __b.__a || __c': 'const {__a = __c} = __b',
                }),
            }],
        ],
    });
    
    t.deepEqual(result.code, fixture.recastDestructuringAssignFix);
    t.end();
});

test('putout: overlap', (t) => {
    const result = putout(fixture.overlap, {
        fixCount: 1,
        plugins: [
            'convert-apply-to-spread',
            'convert-arguments-to-rest',
        ],
    });
    
    t.deepEqual(result.code, fixture.overlapFix);
    t.end();
});

test('putout: isJSX', (t) => {
    const [e] = tryCatch(putout, fixture.jsx);
    
    t.notOk(e, 'should not be an error');
    t.end();
});

test('putout: isJSX: disabled', (t) => {
    const [e] = tryCatch(putout, fixture.jsx, {
        isJSX: false,
    });
    
    t.ok(e, 'should be an error');
    t.end();
});

test('putout: transform', (t) => {
    const ast = putout.parse(fixture.comment);
    
    putout.transform(ast, fixture.comment, {
        rules: {
            'nodejs/convert-commonjs-to-esm': 'on',
        },
        plugins: ['nodejs'],
    });
    
    const result = putout.print(ast);
    const expected = fixture.commentFix;
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: plugin: no options (find, push)', (t) => {
    const ast = putout.parse('var id = 5');
    
    const plugin = {
        report: () => 'Identifier found',
        find(ast, {push, traverse}) {
            traverse(ast, {
                Identifier(path) {
                    push(path);
                },
            });
        },
    };
    
    const places = putout.findPlaces(ast, fixture.comment, {
        plugins: [{
            'find/push': plugin,
        }],
    });
    
    const expected = [{
        message: 'Identifier found',
        position: {
            column: 4,
            line: 1,
        },
        rule: 'find/push',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: plugin: options', (t) => {
    const ast = putout.parse('var id = 5');
    
    const plugin = {
        report: () => 'Identifier found',
        find(ast, {push, traverse, options}) {
            traverse(ast, {
                Identifier(path) {
                    if (options.ignore)
                        return;
                    
                    push(path);
                },
            });
        },
    };
    
    const places = putout.findPlaces(ast, fixture.comment, {
        rules: {
            'find/push': [true, {
                ignore: true,
            }],
        },
        plugins: [
            ['find/push', plugin],
        ],
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: plugin: options: off', (t) => {
    const ast = putout.parse('var id = 5');
    
    const plugin = {
        report: () => 'Identifier found',
        find(ast, {push, traverse, options}) {
            traverse(ast, {
                Identifier(path) {
                    if (options.ignore)
                        return;
                    
                    push(path);
                },
            });
        },
    };
    
    const places = putout.findPlaces(ast, fixture.comment, {
        rules: {
            'find/push': ['off', {}],
        },
        plugins: [
            ['find/push', plugin],
        ],
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: plugin: include', (t) => {
    const include = {
        report: () => 'debugger found',
        fix: () => {},
        include: () => ['debugger'],
    };
    
    const {places} = putout('debugger', {
        plugins: [{
            include,
        }],
    });
    
    const expected = [{
        message: 'debugger found',
        position: {
            column: 0,
            line: 1,
        },
        rule: 'include',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: plugin: include: fix', (t) => {
    const include = {
        report: () => 'debugger found',
        fix: (path) => path.remove(),
        include: () => ['debugger'],
    };
    
    const {places} = putout('debugger', {
        plugins: [{
            include,
        }],
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: plugin: include: empty: fix', (t) => {
    const include = {
        report: () => 'debugger found',
        fix: (path) => path.remove(),
        include: () => [],
    };
    
    const {places} = putout('debugger', {
        plugins: [{
            include,
        }],
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: plugin: exclude', (t) => {
    const include = {
        report: () => 'debugger found',
        fix: () => {},
        exclude: () => ['debugger'],
    };
    
    const {places} = putout('debugger', {
        plugins: [{
            include,
        }],
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: find: template', (t) => {
    const include = {
        report: () => '',
        fix: () => {},
        find: (ast, {push, traverse}) => {
            return traverse(ast, {
                'class __ extends React.Component {}': push,
                'class __ extends Component {}': push,
            });
        },
    };
    
    const {places} = putout('class Hello extends React.Component {}', {
        plugins: [{
            include,
        }],
    });
    
    const expected = [{
        message: '',
        position: {
            column: 0,
            line: 1,
        },
        rule: 'include',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: filter', (t) => {
    const include = {
        report: () => '',
        fix: () => {},
        filter: () => false,
        include: () => [
            'class __ extends React.Component {}',
            'class __ extends Component {}',
        ],
    };
    
    const {places} = putout('class Hello extends React.Component {}', {
        plugins: [{
            include,
        }],
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: source map', (t) => {
    const source = montag`
        const a = b;
    `;
    
    const {code} = putout(source, {
        printer: 'recast',
        sourceFileName: 'hello',
        sourceMapName: 'world',
    });
    
    const expected = montag`
          const a = b;
          //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlbGxvIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyIsImZpbGUiOiJ3b3JsZCIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGEgPSBiOyJdfQ==
    \n`;
    
    t.equal(code, expected);
    t.end();
});

test('putout: no source', (t) => {
    const [error] = tryCatch(putout);
    
    t.equal(error.message, `☝️ Looks like 'source' has type 'undefined', expected: 'string'`);
    t.end();
});

test('putout: printer: putout', (t) => {
    const {code} = putout(fixture.printerPutout, {
        printer: 'putout',
        plugins: ['remove-unused-variables'],
    });
    
    const expected = fixture.printerPutoutFix;
    
    t.equal(code, expected);
    t.end();
});

test('putout: printer: putout: options', (t) => {
    const {code} = putout(fixture.printerPutoutOptions, {
        printer: ['putout', {
            format: {
                indent: '  ',
            },
        }],
        plugins: ['remove-unused-variables'],
    });
    
    const expected = fixture.printerPutoutOptionsFix;
    
    t.equal(code, expected);
    t.end();
});

test('putout: progress', async (t) => {
    const progress = createProgress();
    const source = montag`
        __putout_processor_filesystem([
            '/coverage/'
        ]);
    `;
    
    const [[{
        pluginsIndex,
        pluginsCount,
    }]] = await Promise.all([
        once(progress, 'push'),
        putout(source, {
            progress,
            rules: {
                'filesystem/remove-files': ['on', {
                    names: ['coverage'],
                }],
            },
            plugins: ['filesystem'],
        }),
    ]);
    
    t.equal(pluginsCount, 2);
    t.end();
});

test('putout: loader: no plugin found', (t) => {
    const {places} = putout('const a = 5', {
        fix: false,
        rules: {
            'remove-unused-labels': 'off',
        },
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = [{
        message: `No plugin found for a rule: 'remove-unused-labels'`,
        position: {
            column: 1,
            line: 1,
        },
        rule: 'loader',
    }, {
        message: `'a' is defined but never used`,
        position: {
            column: 6,
            line: 1,
        },
        rule: 'remove-unused-variables',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});
