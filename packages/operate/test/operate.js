'use strict';

const {test, stub} = require('supertape');

const putout = require('putout');
const montag = require('montag');
const operate = require('..');
const {readFixtures} = require('./fixture');

const {
    traverse,
    parse,
    types,
    print,
    template,
} = putout;

const fixture = readFixtures();

const {
    BlockStatement,
    ContinueStatement,
    ReturnStatement,
    ExpressionStatement,
    Identifier,
    StringLiteral,
    SequenceExpression,
    CallExpression,
    ObjectExpression,
    ObjectProperty,
} = types;

test('putout: operate: replaceWith', (t) => {
    const node = {};
    const replaceWith = stub();
    const isExpressionStatement = stub().returns(false);
    
    const parentPath = {
        isExpressionStatement,
    };
    
    const path = {
        node,
        parentPath,
        replaceWith,
    };
    
    operate.replaceWith(path, node);
    
    t.calledWith(replaceWith, [node], 'should call replaceWith');
    t.end();
});

test('putout: operate: replaceWith: no parentPath', (t) => {
    const node = {};
    const replaceWith = stub();
    
    const path = {
        node,
        replaceWith,
    };
    
    const result = operate.replaceWith(path, node);
    
    t.equal(result, path, 'should return result');
    t.end();
});

test('putout: operate: replaceWith: result', (t) => {
    const node = {};
    const replaceWith = stub();
    const isExpressionStatement = stub().returns(false);
    
    const parentPath = {
        isExpressionStatement,
    };
    
    const path = {
        node,
        parentPath,
        replaceWith,
    };
    
    const result = operate.replaceWith(path, node);
    
    t.equal(result, path, 'should return result');
    t.end();
});

test('putout: operate: replaceWith: expression', (t) => {
    const node = {};
    const replaceWith = stub();
    const isExpressionStatement = stub().returns(true);
    const isProgram = stub().returns(false);
    
    const parentPath = {
        isExpressionStatement,
        node,
        replaceWith,
        isProgram,
    };
    
    const path = {
        parentPath,
        node,
        replaceWith,
    };
    
    const result = operate.replaceWith(path, node);
    
    t.equal(result, parentPath, 'should return result');
    t.end();
});

test('putout: operate: replaceWith: expression: isProgram', (t) => {
    const node = {};
    const replaceWith = stub();
    const isExpressionStatement = stub().returns(true);
    const isProgram = stub().returns(true);
    
    const parentPath = {
        node,
        replaceWith,
        isProgram,
        isExpressionStatement,
    };
    
    const path = {
        parentPath,
        node,
        replaceWith,
    };
    
    const result = operate.replaceWith(path, node);
    
    t.equal(result, path, 'should return result');
    t.end();
});

test('putout: operate: replaceWith: comments', (t) => {
    const comments = [];
    const replaceWith = stub();
    const isExpressionStatement = stub().returns(false);
    
    const parentPath = {
        isExpressionStatement,
    };
    
    const node = {
        comments,
    };
    
    const newNode = {};
    
    const path = {
        node,
        parentPath,
        replaceWith,
    };
    
    operate.replaceWith(path, newNode);
    
    t.equal(path.node.comments, comments);
    t.end();
});

test('putout: operate: replaceWith: loc', (t) => {
    const loc = {};
    const replaceWith = stub();
    const isExpressionStatement = stub().returns(false);
    
    const node = {
        loc,
    };
    
    const newNode = {};
    
    const parentPath = {
        isExpressionStatement,
    };
    
    const path = {
        node,
        replaceWith,
        parentPath,
    };
    
    operate.replaceWith(path, newNode);
    
    t.equal(path.node.loc, loc);
    t.end();
});

test('putout: operate: insertAfter', (t) => {
    const node = {};
    const insertAfter = stub();
    
    const path = {
        node,
        insertAfter,
    };
    
    operate.insertAfter(path, node);
    
    t.calledWith(insertAfter, [node], 'should call reporter');
    t.end();
});

test('putout: operate: insertAfter: comments', (t) => {
    const comments = [];
    const insertAfter = stub();
    
    const node = {
        comments,
    };
    
    const newNode = {};
    
    const path = {
        node,
        insertAfter,
    };
    
    operate.insertAfter(path, newNode);
    
    t.equal(path.node.comments, comments);
    t.end();
});

test('putout: operate: replaceWithMultiple', (t) => {
    const nodes = [];
    const comments = [];
    const replaceWithMultiple = stub().returns({});
    
    const parentPath = {
        node: {
            comments,
        },
    };
    
    const node = {};
    
    const path = {
        node,
        parentPath,
        replaceWithMultiple,
    };
    
    operate.replaceWithMultiple(path, nodes);
    
    t.calledWith(replaceWithMultiple, [nodes], 'should call reporter');
    t.end();
});

test('putout: operate: replaceWithMultiple: for-of-return', (t) => {
    const ast = parse(fixture.forOfReturn);
    
    traverse(ast, {
        ReturnStatement(path) {
            operate.replaceWithMultiple(path, [
                ExpressionStatement(path.node.argument),
                ContinueStatement(),
            ]);
        },
    });
    
    const result = print(ast);
    const expected = fixture.forOfReturnFix;
    
    t.equal(result, expected);
    t.end();
});

test('putout: operate: replaceWithMultiple: for-of: empty return', (t) => {
    const ast = parse(fixture.forOfEmptyReturn);
    
    traverse(ast, {
        ReturnStatement(path) {
            operate.replaceWithMultiple(path, [
                path.node.argument,
                ContinueStatement(),
            ]);
        },
    });
    
    const result = print(ast);
    const expected = fixture.forOfEmptyReturnFix;
    
    t.equal(result, expected);
    t.end();
});

test('putout: operate: remove: comment', (t) => {
    const {code} = putout(fixture.comment, {
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = fixture.commentFix;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operate: remove: not-top-comment', (t) => {
    const {code} = putout(fixture.notTopComments, {
        plugins: [
            'remove-useless-variables',
        ],
    });
    
    const expected = fixture.notTopCommentsFix;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operate: remove: comment: if', (t) => {
    const {code} = putout(fixture.commentIf, {
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = fixture.commentIfFix;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operate: replaceWithMultiple: parent comment', (t) => {
    const {code} = putout(fixture.parentComment, {
        plugins: [
            'split-variable-declarations',
        ],
    });
    
    const expected = fixture.parentCommentFix;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operate: replaceWithMultiple: current comment', (t) => {
    const {code} = putout(fixture.currentComment, {
        plugins: [
            'extract-sequence-expressions',
        ],
    });
    
    const expected = fixture.currentCommentFix;
    
    t.equal(code, expected);
    t.end();
});

test('putout: operate: replaceWithMultiple: empty array', (t) => {
    const replaceWithMultiple = stub().returns([]);
    const comments = [];
    
    const node = {
        comments,
    };
    
    const parentPath = {
        node: {
            comments,
        },
    };
    
    const path = {
        node,
        parentPath,
        replaceWithMultiple,
    };
    
    const newPath = operate.replaceWithMultiple(path, []);
    
    t.deepEqual(newPath, []);
    t.end();
});

test('putout: operate: isModuleExports: path', (t) => {
    const ast = parse(`module.exports = 'hello'`);
    let is;
    
    traverse(ast, {
        AssignmentExpression(path) {
            const leftPath = path.get('left');
            
            is = operate.isModuleExports(leftPath);
            
            path.stop();
        },
    });
    
    t.ok(is, 'module.exports exists');
    t.end();
});

test('putout: operate: isModuleExports: node', (t) => {
    const ast = parse(`module.exports = 'hello'`);
    let is;
    
    traverse(ast, {
        AssignmentExpression(path) {
            is = operate.isModuleExports(path.node.left);
            path.stop();
        },
    });
    
    t.ok(is, 'module.exports exists');
    t.end();
});

test('putout: operate: isModuleExports: no module', (t) => {
    const ast = parse(`a.exports = 'hello'`);
    let is;
    
    traverse(ast, {
        AssignmentExpression(path) {
            is = operate.isModuleExports(path.node.left);
            path.stop();
        },
    });
    
    t.notOk(is, 'module.exports exists');
    t.end();
});

test('putout: operate: isModuleExports: no exports', (t) => {
    const ast = parse(`module.b = 'hello'`);
    let is;
    
    traverse(ast, {
        AssignmentExpression(path) {
            is = operate.isModuleExports(path.node.left);
            path.stop();
        },
    });
    
    t.notOk(is, 'module.exports exists');
    t.end();
});

test('operate: findBindings: not found', (t) => {
    const ast = parse('const t = "hello"');
    let result;
    
    traverse(ast, {
        VariableDeclarator(path) {
            result = operate.findBinding(path, 'hello');
            path.stop();
        },
    });
    
    t.notOk(result, 'should equal');
    t.end();
});

test('operate: findBindings: found', (t) => {
    const ast = parse('const t = "hello"');
    let result;
    
    traverse(ast, {
        VariableDeclarator(path) {
            result = operate.findBinding(path, 't');
            path.stop();
        },
    });
    
    t.ok(result, 'should equal');
    t.end();
});

test('operate: replaceWithMultiple: to expressions', (t) => {
    const ast = parse('const t = "hello"');
    
    traverse(ast, {
        VariableDeclaration(path) {
            operate.replaceWithMultiple(path, [
                Identifier('hello'),
                StringLiteral('world'),
                SequenceExpression([
                    Identifier('a'),
                    Identifier('b'),
                ]),
                CallExpression(Identifier('hello'), []),
                ObjectExpression([
                    ObjectProperty(StringLiteral('a'), StringLiteral('b')),
                ]),
            ]);
        },
    });
    
    const result = print(ast);
    
    const expected = [
        `hello;`,
        `'world';`,
        `a, b;`,
        `hello();`,
        ``,
        `({`,
        `  'a': 'b'`,
        `});`,
    ].join('\n');
    
    t.equal(result, expected);
    t.end();
});

test('operate: replaceWithMultiple: to expressions: ignore', (t) => {
    const ast = parse(`const t = {hello: 'world'}`);
    
    traverse(ast, {
        ObjectProperty(path) {
            operate.replaceWithMultiple(path, [
                ObjectProperty(StringLiteral('a'), StringLiteral('b')),
                ObjectProperty(StringLiteral('c'), StringLiteral('d')),
            ]);
            
            path.stop();
        },
    });
    
    const result = print(ast);
    
    const expected = [
        `const t = {`,
        `  'a': 'b',`,
        `  'c': 'd'`,
        `}`,
    ].join('\n');
    
    t.equal(result, expected);
    t.end();
});

test('operate: remove', (t) => {
    const ast = parse(montag`
        // hello
        var a = 1;
        x = 2;
    `);
    
    traverse(ast, {
        VariableDeclaration(path) {
            operate.remove(path);
        },
    });
    
    const result = print(ast);
    
    const expected = montag`
        // hello
        x = 2;
    `;
    
    t.equal(result, expected);
    t.end();
});

test('operate: remove: empty', (t) => {
    const ast = parse(montag`
        // hello
        var a = 1;
    `);
    
    traverse(ast, {
        VariableDeclaration(path) {
            operate.remove(path);
        },
    });
    
    const result = print(ast);
    
    const expected = montag`
        // hello
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('operate: remove: VariableDeclarator', (t) => {
    const ast = parse(montag`
        // hello
        var a = 1;
    `);
    
    traverse(ast, {
        VariableDeclarator(path) {
            operate.remove(path);
        },
    });
    
    const result = print(ast);
    
    const expected = montag`
        // hello
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('operate: remove: VariableDeclarator: a couple', (t) => {
    const ast = parse(montag`
        // hello
        var a = 1, b = 2;
    `);
    
    traverse(ast, {
        VariableDeclarator(path) {
            operate.remove(path);
            path.stop();
        },
    });
    
    const result = print(ast);
    
    const expected = montag`
        // hello
        var b = 2;
    `;
    
    t.equal(result, expected);
    t.end();
});

test('operate: getPathAfterImports', (t) => {
    const ast = parse(montag`
        import {readFile} from 'fs/promises';
    `);
    
    traverse(ast, {
        ImportDeclaration(path) {
            const programScope = path.scope.getProgramParent();
            const body = programScope.path.get('body');
            const afterImportsPath = operate.getPathAfterImports(body);
            
            afterImportsPath.insertAfter(template.ast('const x = 5;'));
            path.stop();
        },
    });
    
    const result = print(ast);
    
    const expected = montag`
        import {readFile} from 'fs/promises';
        const x = 5;
    `;
    
    t.equal(result, expected);
    t.end();
});

test('operate: getPathAfterImports: couple imports', (t) => {
    const ast = parse(montag`
        import {readFile} from 'fs/promises';
        import {join} from 'path';
    `);
    
    traverse(ast, {
        ImportDeclaration(path) {
            const programScope = path.scope.getProgramParent();
            const body = programScope.path.get('body');
            const afterImportsPath = operate.getPathAfterImports(body);
            
            afterImportsPath.insertAfter(template.ast('const x = 5;'));
            path.stop();
        },
    });
    
    const result = print(ast);
    
    const expected = montag`
        import {readFile} from 'fs/promises';
        import {join} from 'path';
        const x = 5;
    `;
    
    t.equal(result, expected);
    t.end();
});

test('opreate: getBinding', (t) => {
    const {getBinding} = require('../lib/get-binding');
    
    t.equal(operate.getBinding, getBinding);
    t.end();
});

test('opreate: getBindingPath', (t) => {
    const {getBindingPath} = require('../lib/get-binding');
    
    t.equal(operate.getBindingPath, getBindingPath);
    t.end();
});

test('opreate: extract', (t) => {
    const {extract} = require('../lib/extract');
    
    t.equal(operate.extract, extract);
    t.end();
});

test('opreate: compute', (t) => {
    const {compute} = require('../lib/compute');
    
    t.equal(operate.compute, compute);
    t.end();
});

test('opreate: getProperties', (t) => {
    const {getProperties} = require('../lib/properties');
    
    t.equal(operate.getProperties, getProperties);
    t.end();
});

test('opreate: getProperty', (t) => {
    const {getProperty} = require('../lib/properties');
    
    t.equal(operate.getProperty, getProperty);
    t.end();
});

test('opreate: getExportDefault', (t) => {
    const {getExportDefault} = require('../lib/get-export-default');
    
    t.equal(operate.getExportDefault, getExportDefault);
    t.end();
});

test('operate: isESM: no', (t) => {
    let is = true;
    
    const ast = parse(montag`
        const a = require('hello');
    `);
    
    traverse(ast, {
        Program(path) {
            is = operate.isESM(path);
        },
    });
    
    t.notOk(is);
    t.end();
});

test('operate: isESM: yes', (t) => {
    let is = true;
    
    const ast = parse(montag`
        import {readFile} from 'fs/promises';
        
        export const read = async () => {
            return await readFile('./README.md', 'utf8');
        }
    `);
    
    traverse(ast, {
        CallExpression(path) {
            is = operate.isESM(path);
        },
    });
    
    t.ok(is);
    t.end();
});

test('operate: isESM: yes: export', (t) => {
    let is = true;
    
    const ast = parse(montag`
        export const read = async () => {
            return await readFile('./README.md', 'utf8');
        }
    `);
    
    traverse(ast, {
        CallExpression(path) {
            is = operate.isESM(path);
        },
    });
    
    t.ok(is);
    t.end();
});

test('putout: operate: toExpression', (t) => {
    let result;
    const ast = parse('a + b');
    
    traverse(ast, {
        BinaryExpression(path) {
            result = operate.toExpression(path);
        },
    });
    
    t.equal(result.type, 'ExpressionStatement');
    t.end();
});

test('putout: operate: replaceWith: body of ArrowFunctionExpression: Expression -> Statement', (t) => {
    const ast = parse(fixture.arrowFunction);
    
    traverse(ast, {
        CallExpression(path) {
            operate.replaceWith(path, ReturnStatement());
            path.stop();
        },
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.arrowFunctionFix);
    t.end();
});

test('putout: operate: replaceWith: body of ArrowFunctionExpression: Expression -> Expression', (t) => {
    const ast = parse(fixture.arrowFunctionWithExpression);
    
    traverse(ast, {
        CallExpression(path) {
            operate.replaceWith(path, Identifier('hello'));
            path.stop();
        },
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.arrowFunctionWithExpressionFix);
    t.end();
});

test('putout: operate: replaceWithMultiple: body of ArrowFunctionExpression: Expression -> Statement', (t) => {
    const ast = parse(fixture.arrowFunction);
    
    traverse(ast, {
        CallExpression(path) {
            operate.replaceWithMultiple(path, [
                ReturnStatement(),
            ]);
            path.stop();
        },
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.arrowFunctionFix);
    t.end();
});

test('putout: operate: replaceWith: body of ArrowFunctionExpression: BlockStatement -> Statement', (t) => {
    const ast = parse(fixture.block);
    
    traverse(ast, {
        BlockStatement(path) {
            operate.replaceWith(path, BlockStatement([]));
            path.stop();
        },
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.blockFix);
    t.end();
});

test('putout: operate: remove: ArrayPattern', (t) => {
    const ast = parse('const [a, b] = c;');
    
    traverse(ast, {
        ArrayPattern(path) {
            operate.remove(path.get('elements.0'));
            path.stop();
        },
    });
    
    const result = print(ast);
    const expected = 'const [, b] = c;';
    
    t.equal(result, expected);
    t.end();
});

test('putout: operate: remove: ArrayPattern: second', (t) => {
    const ast = parse('const [a, b] = c;');
    
    traverse(ast, {
        ArrayPattern(path) {
            operate.remove(path.get('elements.1'));
            path.stop();
        },
    });
    
    const result = print(ast);
    const expected = 'const [a] = c;';
    
    t.equal(result, expected);
    t.end();
});

test('putout: operate: isSimple', (t) => {
    const ast = parse('const [a, b] = c;');
    const result = operate.isSimple(ast);
    
    t.notOk(result);
    t.end();
});

test('putout: operate: renameProperty', (t) => {
    const ast = parse('const {a, hello: world} = c;');
    
    traverse(ast, {
        VariableDeclaration(path) {
            operate.renameProperty(path, 'hello', 'world');
        },
    });
    
    const result = print(ast);
    const expected = 'const {a, world} = c;';
    
    t.equal(result, expected);
    t.end();
});

test('putout: operate: rename', (t) => {
    const ast = parse('const {hello} = c; hello();');
    
    traverse(ast, {
        VariableDeclaration(path) {
            operate.rename(path, 'hello', 'world');
        },
    });
    
    const result = print(ast, {
        printer: 'putout',
    });
    const expected = montag`
        const {world} = c;
        world();\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('putout: operate: rename: deep', (t) => {
    const ast = parse(montag`
        function main() {
            const {hello} = c;
            
            f(() => {
                hello();
            });
        }
    `);
    
    putout.operator.traverse(ast, {
        'hello()'(path) {
            operate.rename(path, 'hello', 'world');
        },
    });
    
    const result = print(ast, {
        printer: 'putout',
    });
    const expected = montag`
        function main() {
            const {world} = c;
            
            f(() => {
                world();
            });
        }\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('putout: operate: rename: no bindings', (t) => {
    const ast = parse('hello();');
    
    putout.operator.traverse(ast, {
        'hello()'(path) {
            operate.rename(path, 'hello', 'world');
        },
    });
    
    const result = print(ast, {
        printer: 'putout',
    });
    
    t.equal(result, 'hello();\n');
    t.end();
});

test('putout: operate: remove: already removed', (t) => {
    const source = `
        let a;
        let b;
        
        a = 5;
        b = 6;
        
        console.log(a);
    `;
    
    const {code} = putout(source, {
        printer: 'putout',
        plugins: [
            'remove-unreferenced-variables',
            'minify',
        ],
    });
    
    const expected = montag`
        let a;
        
        a = 5;
        
        console.log(a);
    
    `;
    
    t.equal(code, expected);
    t.end();
});

