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
        babelPlugins: [
            'transform-inline-consecutive-adds',
        ],
    });
    
    t.deepEqual(code, fixture.babelPluginsFix);
    t.end();
});

test('putout: babelPlugins: position: shebang', (t) => {
    const {places} = putout(fixture.babelPlugins, {
        fix: false,
        babelPlugins: [
            'transform-inline-consecutive-adds',
        ],
    });
    
    const expected = [{
        rule: 'babel: transform-inline-consecutive-adds',
        message: 'transform inline consecutive adds',
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
        babelPlugins: [
            'transform-inline-consecutive-adds',
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

