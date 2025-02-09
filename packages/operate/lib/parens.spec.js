'use strict';

const test = require('supertape');

const {
    parse,
    print,
    traverse,
} = require('putout');

const {addParens, removeParens} = require('./parens');

test('putout: operate: parens: removeParens: putout', (t) => {
    const source = '(b = 3)';
    const ast = parse(source);
    
    traverse(ast, {
        AssignmentExpression: removeParens,
    });
    
    const result = print(ast);
    const expected = 'b = 3;\n';
    
    t.equal(result, expected);
    t.end();
});

test('putout: operate: parens: removeParens: babel', (t) => {
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

test('putout: operate: parens: addParens', (t) => {
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

test('putout: operate: parens: addParens: babel', (t) => {
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

test('putout: operate: parens: addParens: babel: ts', (t) => {
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
