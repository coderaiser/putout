'use strict';

const test = require('supertape');

const {
    parse,
    print,
    traverse,
} = require('putout');

const {
    addParens,
    removeParens,
    hasParens,
} = require('./parens');

test('putout: operator: parens: removeParens: putout', (t) => {
    const source = '(b = 3)';
    const ast = parse(source);
    
    traverse(ast, {
        AssignmentExpression: (path) => {
            removeParens(path);
        },
    });
    
    const result = print(ast);
    const expected = 'b = 3;\n';
    
    t.equal(result, expected);
    t.end();
});

test('putout: operator: parens: removeParens: putout: return', (t) => {
    const source = '(b = 3)';
    const ast = parse(source);
    let result;
    
    traverse(ast, {
        AssignmentExpression: (path) => {
            result = removeParens(path);
        },
    });
    
    t.equal(result.type, 'AssignmentExpression');
    t.end();
});

test('putout: operator: parens: removeParens: babel', (t) => {
    const source = '(b = 3)';
    const ast = parse(source, {
        printer: 'babel',
    });
    
    traverse(ast, {
        AssignmentExpression(path) {
            removeParens(path);
            path.stop();
        },
    });
    
    const result = print(ast, {
        printer: 'babel',
    });
    
    const expected = 'b = 3;\n';
    
    t.equal(result, expected);
    t.end();
});

test('putout: operator: parens: removeParens: babel: no parens', (t) => {
    const source = 'b = 3';
    const ast = parse(source, {
        printer: 'babel',
    });
    
    traverse(ast, {
        NumericLiteral(path) {
            removeParens(path);
            path.stop();
        },
    });
    
    const result = print(ast, {
        printer: 'babel',
    });
    
    const expected = 'b = 3;\n';
    
    t.equal(result, expected);
    t.end();
});

test('putout: operator: parens: removeParens: babel: return', (t) => {
    const source = '(b = 3)';
    const ast = parse(source, {
        printer: 'babel',
    });
    
    let result;
    
    traverse(ast, {
        AssignmentExpression(path) {
            result = removeParens(path);
            path.stop();
        },
    });
    
    t.equal(result.type, 'AssignmentExpression');
    t.end();
});

test('putout: operator: parens: addParens', (t) => {
    const source = 'const b = a';
    const ast = parse(source);
    
    traverse(ast, {
        VariableDeclarator(path) {
            addParens(path.get('init'));
            path.stop();
        },
    });
    
    const result = print(ast);
    const expected = 'const b = (a);\n';
    
    t.equal(result, expected);
    t.end();
});

test('putout: operator: parens: addParens: return', (t) => {
    const source = 'const b = a';
    const ast = parse(source);
    let result;
    
    traverse(ast, {
        VariableDeclarator(path) {
            result = addParens(path.get('init'));
            path.stop();
        },
    });
    
    t.equal(result.type, 'Identifier');
    t.end();
});

test('putout: operator: parens: addParens: babel', (t) => {
    const source = 'b = 3';
    const ast = parse(source, {
        printer: 'babel',
    });
    
    traverse(ast, {
        AssignmentExpression(path) {
            addParens(path);
            path.stop();
        },
    });
    
    const result = print(ast, {
        printer: 'babel',
    });
    
    const expected = '(b = 3);\n';
    
    t.equal(result, expected);
    t.end();
});

test('putout: operator: parens: addParens: babel: has parens', (t) => {
    const source = '(b = 3)';
    const ast = parse(source, {
        printer: 'babel',
    });
    
    traverse(ast, {
        AssignmentExpression(path) {
            addParens(path);
            path.stop();
        },
    });
    
    const result = print(ast, {
        printer: 'babel',
    });
    
    const expected = '(b = 3);\n';
    
    t.equal(result, expected);
    t.end();
});

test('putout: operator: parens: addParens: babel: return', (t) => {
    const source = 'b = 3';
    const ast = parse(source, {
        printer: 'babel',
    });
    
    let result;
    
    traverse(ast, {
        AssignmentExpression(path) {
            result = addParens(path);
            path.stop();
        },
    });
    
    t.equal(result.type, 'ParenthesizedExpression');
    t.end();
});

test('putout: operator: parens: addParens: babel: ts', (t) => {
    const source = 'const a: boolean = true;';
    const ast = parse(source, {
        printer: 'babel',
        isTS: true,
    });
    
    traverse(ast, {
        TSBooleanKeyword(path) {
            addParens(path);
            path.stop();
        },
    });
    
    const result = print(ast, {
        printer: 'babel',
    });
    
    const expected = 'const a: (boolean) = true;\n';
    
    t.equal(result, expected);
    t.end();
});

test('putout: operator: parens: hasParens: babel: ts', (t) => {
    let result = false;
    const source = 'const a: (boolean) = true;';
    const ast = parse(source, {
        printer: 'babel',
        isTS: true,
    });
    
    traverse(ast, {
        TSBooleanKeyword(path) {
            result = hasParens(path);
            path.stop();
        },
    });
    
    t.ok(result);
    t.end();
});

test('putout: operator: parens: hasParens: babel', (t) => {
    let result = false;
    const source = '(b = 3)';
    const ast = parse(source, {
        printer: 'babel',
    });
    
    traverse(ast, {
        AssignmentExpression(path) {
            result = hasParens(path);
            path.stop();
        },
    });
    
    t.ok(result);
    t.end();
});

test('putout: operator: parens: hasParens', (t) => {
    let result = false;
    const source = '(b = 3)';
    const ast = parse(source);
    
    traverse(ast, {
        AssignmentExpression(path) {
            result = hasParens(path);
            path.stop();
        },
    });
    
    t.ok(result);
    t.end();
});
