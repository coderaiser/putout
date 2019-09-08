'use strict';

const test = require('supertape');
const tryCatch = require('try-catch');

const putout = require('..');
const {readFixtures} = require('./fixture');

const fixture = readFixtures([
    'await-outside-func',
    'comment',
    'comment-fix',
    'debugger',
    'debugger-fix',
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
    'not-jsx',
    'babel-plugins',
    'babel-plugins-fix',
    'jscodeshift',
    'jscodeshift-fix',
    'jscodeshift-options',
    'jscodeshift-options-fix',
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

test('putout: export default declaration: acorn', (t) => {
    const {code} = putout(fixture.exportDefaultDeclaration, {
        parser: 'acorn',
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = fixture.exportDefaultDeclarationFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: export default declaration: esprima', (t) => {
    const {code} = putout(fixture.exportDefaultDeclaration, {
        parser: 'esprima',
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = fixture.exportDefaultDeclarationFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: export default declaration: custom parser', (t) => {
    const [e] = tryCatch(putout, fixture.exportDefaultDeclaration, {
        parser: 'custom',
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = `Cannot find module 'custom'`;
    t.ok(e.message.includes(expected), 'should equal');
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

test('putout: use strict: parser: espree: debugger', (t) => {
    const {code} = putout(fixture.debugger, {
        parser: 'espree',
        fixCount: 1,
        plugins: [
            'remove-debugger',
        ],
    });
    
    const expected = fixture.debuggerFix;
    
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
            line: 'x',
            column: 'x',
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
            line: 'x',
            column: 'x',
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
            line: 'x',
            column: 'x',
        },
    }];
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

test('putout: plugin: traverse: template', (t) => {
    const exp = {
        report: () => '',
        fix: () => {},
        traverse: ({push}) => ({
            'module.exports = {}'(path) {
                push(path);
            },
        }),
    };
    
    const {places} = putout('module.exports = {a: 1}', {
        plugins: [{
            exp,
        }],
    });
    
    const expected = [{
        rule: 'exp',
        message: '',
        position: {
            line: 1,
            column: 0,
        },
    }];
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

test('putout: plugin: traverse: template: literal', (t) => {
    const exp = {
        report: () => '',
        fix: () => {},
        traverse: ({push}) => ({
            'console["__"]()'(path) {
                push(path);
            },
        }),
    };
    
    const {places} = putout('console["log"]()', {
        plugins: [{
            exp,
        }],
    });
    
    const expected = [{
        rule: 'exp',
        message: '',
        position: {
            line: 1,
            column: 0,
        },
    }];
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

test('putout: plugin: traverse: similar', (t) => {
    const exp = {
        report: () => '',
        fix: () => {},
        traverse: ({push}) => ({
            'module.exports = {}'(path) {
                push(path);
            },
            'module.exports.__ = {}'(path) {
                push(path);
            },
        }),
    };
    
    const {places} = putout('module.exports = {a: 1}', {
        plugins: [{
            exp,
        }],
    });
    
    const expected = [{
        rule: 'exp',
        message: '',
        position: {
            line: 1,
            column: 0,
        },
    }];
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

test('putout: plugin: traverse: template: null', (t) => {
    const ret = {
        report: () => '',
        fix: () => {},
        traverse: ({push}) => ({
            'return __'(path) {
                push(path);
            },
        }),
    };
    
    const {places} = putout('return null', {
        plugins: [{
            ret,
        }],
    });
    
    const expected = [{
        rule: 'ret',
        message: '',
        position: {
            line: 1,
            column: 0,
        },
    }];
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

test('putout: plugin: traverse: template: word', (t) => {
    const exp = {
        report: () => '',
        fix: () => {},
        traverse: ({push}) => ({
            'debugger'(path) {
                push(path);
            },
        }),
    };
    
    const {places} = putout('debugger; module.exports = {a: 1}', {
        plugins: [{
            exp,
        }],
    });
    
    const expected = [{
        rule: 'exp',
        message: '',
        position: {
            line: 1,
            column: 0,
        },
    }];
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

test('putout: plugin: traverse: template: __', (t) => {
    const exp = {
        report: () => '',
        fix: () => {},
        traverse: ({push}) => ({
            'module.exports = __'(path) {
                push(path);
            },
        }),
    };
    
    const {places} = putout('module.exports = {a: 1}', {
        plugins: [{
            exp,
        }],
    });
    
    const expected = [{
        rule: 'exp',
        message: '',
        position: {
            line: 1,
            column: 0,
        },
    }];
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

test('putout: plugin: traverse: template: different', (t) => {
    const exp = {
        report: () => '',
        fix: () => {},
        traverse: ({push}) => ({
            'module.exports = {}'(path) {
                push(path);
            },
        }),
    };
    
    const {places} = putout('module.exports = 1', {
        plugins: [{
            exp,
        }],
    });
    
    const expected = [];
    
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

test('putout: isJSX: false', (t) => {
    const [e] = tryCatch(putout, fixture.jsx, {
        isJSX: false,
    });
    
    t.equal(e.message, 'Unexpected token (7:8)', 'should equal');
    t.end();
});

test('putout: typescript: not jsx', (t) => {
    const [e] = tryCatch(putout, fixture.notJsx, {
        isTS: true,
    });
    
    t.notOk(e, 'should not be an error');
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

