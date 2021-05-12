'use strict';

const test = require('supertape');
const tryCatch = require('try-catch');
const stub = require('@cloudcmd/stub');

const putout = require('..');
const {readFixtures} = require('./fixture');

const fixture = readFixtures([
    'await-outside-func',
    'comment',
    'comment-fix',
    'debugger',
    'no-vars',
    'no-parent',
    'root-vars',
    'import',
    'export-default-declaration',
    'export-default-declaration-fix',
    'shebang',
    'shebang-fix',
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
    'babel-plugins',
    'babel-plugins-fix',
    'jscodeshift',
    'jscodeshift-fix',
]);

test('putout: no vars', (t) => {
    const result = putout(fixture.noVars);
    const expected = {
        code: '',
        places: [],
    };
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('putout: root vars', (t) => {
    const result = putout(fixture.rootVars, {
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = {
        code: fixture.rootVars,
        places: [],
    };
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('putout: root vars: no parent', (t) => {
    const result = putout(fixture.noParent, {
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = {
        code: '\n',
        places: [],
    };
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('putout: await outside funciton', (t) => {
    const result = putout(fixture.awaitOutsideFunc, {
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = {
        code: '\n',
        places: [],
    };
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('putout: run plugins', (t) => {
    const result = putout(fixture.import, {
        plugins: [
            'remove-unused-variables',
            'remove-empty',
        ],
    });
    
    const expected = '\n';
    
    t.deepEqual(result.code, expected, 'should equal');
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
    
    t.deepEqual(result.code, expected, 'should equal');
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
    
    t.deepEqual(result.code, fixture.fixCountFix, 'should equal');
    t.end();
});

test('putout: comment', (t) => {
    const result = putout(fixture.comment, {
        plugins: [
            'convert-commonjs-to-esm',
        ],
    });
    
    const expected = fixture.commentFix;
    
    t.deepEqual(result.code, expected, 'should equal');
    t.end();
});

test('putout: shebang', (t) => {
    const {code} = putout(fixture.shebang, {
        plugins: [
            'remove-unused-variables',
        ],
    });
    const expected = fixture.shebangFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: flow', (t) => {
    const {places} = putout(fixture.flow, {
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = [];
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

test('putout: typescript', (t) => {
    const {code} = putout(fixture.typescript, {
        isTS: true,
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    t.deepEqual(code, '\n', 'should equal');
    t.end();
});

test('putout: shebang: message', (t) => {
    const {places} = putout(fixture.shebang, {
        fixCount: 1,
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const {position} = places[0];
    const expected = {
        line: 8,
        column: 4,
    };
    
    t.deepEqual(position, expected, 'should equal');
    t.end();
});
test('putout: shebang', (t) => {
    const {code} = putout(fixture.shebang, {
        plugins: [
            'remove-unused-variables',
        ],
    });
    const expected = fixture.shebangFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: export default declaration', (t) => {
    const {code} = putout(fixture.exportDefaultDeclaration, {
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = fixture.exportDefaultDeclarationFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: export default declaration: espree', (t) => {
    const {code} = putout(fixture.exportDefaultDeclaration, {
        parser: 'espree',
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = fixture.exportDefaultDeclarationFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: export default declaration: espree: places: shebang', (t) => {
    const {places} = putout(fixture.shebang, {
        parser: 'espree',
        fix: false,
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = [{
        rule: 'remove-unused-variables',
        message: '"b" is defined but never used',
        position: {
            line: 8,
            column: 4,
        },
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: use strict', (t) => {
    const {code} = putout(fixture.strictMode, {
        fixCount: 1,
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = fixture.strictModeFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: use strict: fixCount', (t) => {
    const {code} = putout(fixture.strictMode, {
        fixCount: 10,
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = fixture.strictModeFixCount;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: use strict: no fix', (t) => {
    const {code} = putout(fixture.strictMode, {
        fix: false,
    });
    
    const expected = fixture.strictMode;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: traverse: shebang', (t) => {
    const addVar = {
        report: () => '',
        fix: stub(),
        include: () => [
            'debugger',
        ],
    };
    
    const code = [
        '#!/usr/bin/env node',
        'debugger;',
    ].join('\n');
    
    const {places} = putout(code, {
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    const expected = [{
        rule: 'add-variable',
        message: '',
        position: {
            line: 2,
            column: 0,
        },
    }];
    
    t.deepEqual(places, expected, 'should equal');
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
    
    t.deepEqual(places, expected, 'should equal');
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
    
    t.deepEqual(places, expected, 'should equal');
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
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

test('putout: recast destructuring assign', (t) => {
    const result = putout(fixture.recastDestructuringAssign, {
        plugins: [
            'apply-destructuring',
        ],
    });
    
    t.deepEqual(result.code, fixture.recastDestructuringAssignFix, 'should equal');
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
    
    t.deepEqual(result.code, fixture.overlapFix, 'should equal');
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

test('putout: babelPlugins', (t) => {
    const {code} = putout(fixture.babelPlugins, {
        plugins: [
            'babel/transform-inline-consecutive-adds',
        ],
    });
    
    t.deepEqual(code, fixture.babelPluginsFix);
    t.end();
});

test('putout: babelPlugins: espree', (t) => {
    const {code} = putout(fixture.babelPlugins, {
        parser: 'espree',
        plugins: [
            'babel/transform-inline-consecutive-adds',
        ],
    });
    
    t.deepEqual(code, fixture.babelPluginsFix);
    t.end();
});

test('putout: babelPlugins: espree: shebang', (t) => {
    const {code} = putout(fixture.shebang, {
        parser: 'espree',
        plugins: [
            'remove-unused-variables',
            'babel/transform-inline-consecutive-adds',
        ],
    });
    
    t.deepEqual(code, fixture.shebangFix);
    t.end();
});

test('putout: babelPlugins: position: shebang', (t) => {
    const {places} = putout(fixture.babelPlugins, {
        fix: false,
        plugins: [
            'babel/transform-inline-consecutive-adds',
        ],
    });
    
    const expected = [{
        rule: 'babel/transform-inline-consecutive-adds',
        message: 'transform inline consecutive adds',
        position: {
            line: 4,
            column: 0,
        },
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: babelPlugins: custom message', (t) => {
    const message = 'hello world';
    const enabled = true;
    const {places} = putout(fixture.babelPlugins, {
        fix: false,
        rules: {
            'babel/transform-inline-consecutive-adds': [enabled, message],
        },
        plugins: [
            'babel/transform-inline-consecutive-adds',
        ],
    });
    
    const expected = [{
        rule: 'babel/transform-inline-consecutive-adds',
        message,
        position: {
            line: 4,
            column: 0,
        },
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: babelPlugins: shebang', (t) => {
    const {code} = putout(fixture.shebang, {
        plugins: [
            'babel/transform-inline-consecutive-adds',
        ],
    });
    
    t.deepEqual(code, fixture.shebang);
    t.end();
});

test('putout: transform', (t) => {
    const ast = putout.parse(fixture.comment);
    
    putout.transform(ast, fixture.comment, {
        plugins: [
            'convert-commonjs-to-esm',
        ],
    });
    
    const result = putout.print(ast);
    const expected = fixture.commentFix;
    
    t.deepEqual(result, expected, 'should equal');
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
    
    t.deepEqual(places, expected, 'should equal');
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
    
    t.deepEqual(places, expected, 'should equal');
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
            'find/push': ['off', {
            }],
        },
        plugins: [
            ['find/push', plugin],
        ],
    });
    
    const expected = [];
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

test('putout: jscodeshift', (t) => {
    const {code} = putout(fixture.jscodeshift, {
        plugins: [
            'jscodeshift/async-await-codemod/async-await',
        ],
    });
    
    t.deepEqual(code, fixture.jscodeshiftFix);
    t.end();
});

test('putout: jscodeshift: messsage', (t) => {
    const {places} = putout(fixture.jscodeshift, {
        fix: false,
        plugins: [
            'jscodeshift/async-await-codemod/async-await',
        ],
    });
    
    const expected = [{
        message: 'async await codemod/async await',
        position: {
            column: 0,
            line: 2,
        },
        rule: 'jscodeshift/async-await-codemod/async-await',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: plugin: include', (t) => {
    const include = {
        report: () => 'debugger found',
        fix: () => {},
        include: () => [
            'debugger',
        ],
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
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

test('putout: plugin: include: fix', (t) => {
    const include = {
        report: () => 'debugger found',
        fix: (path) => path.remove(),
        include: () => [
            'debugger',
        ],
    };
    
    const {places} = putout('debugger', {
        plugins: [{
            include,
        }],
    });
    
    const expected = [];
    
    t.deepEqual(places, expected, 'should equal');
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
    
    t.deepEqual(places, expected, 'should equal');
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
    
    t.deepEqual(places, expected, 'should equal');
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
    
    t.deepEqual(places, expected, 'should equal');
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
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

