'use strict';

const {
    parse,
    operator,
    print,
} = require('putout');

const {test} = require('supertape');
const {getPathAfterRequires} = require('./get-path-after-requires');

const {traverse} = operator;

test('operate: getPathAfterRequires', (t) => {
    const ast = parse(`
        const a = require('a');
        const x = 'hello';
    `);
    
    traverse(ast, {
        Program: (path) => {
            const pathRequires = getPathAfterRequires(path);
            pathRequires.remove();
        },
    });
    
    const result = print(ast);
    const expected = `const a = require('a');\n`;
    
    t.equal(result, expected);
    t.end();
});

test('operate: getPathAfterRequires: not var', (t) => {
    const ast = parse(`
        const a = require('a');
        fn();
    `);
    
    traverse(ast, {
        Program: (path) => {
            const pathRequires = getPathAfterRequires(path);
            pathRequires.remove();
        },
    });
    
    const result = print(ast);
    const expected = `const a = require('a');\n`;
    
    t.equal(result, expected);
    t.end();
});

test('operate: getPathAfterRequires: not require', (t) => {
    const ast = parse(`
        const a = require('a');
        const x = fn('hello');
    `);
    
    traverse(ast, {
        Program: (path) => {
            const pathRequires = getPathAfterRequires(path);
            pathRequires.remove();
        },
    });
    
    const result = print(ast);
    const expected = `const a = require('a');\n`;
    
    t.equal(result, expected);
    t.end();
});

test('operate: getPathAfterRequires: not program path', (t) => {
    const ast = parse(`
        const a = require('a');
    `);
    
    traverse(ast, {
        VariableDeclaration: (path) => {
            const pathRequires = getPathAfterRequires(path);
            pathRequires.remove();
        },
    });
    
    const result = print(ast);
    const expected = '\n';
    
    t.equal(result, expected);
    t.end();
});

test('operate: getPathAfterRequires: body', (t) => {
    const ast = parse(`
        const a = require('a');
    `);
    
    traverse(ast, {
        Program: (path) => {
            const pathRequires = getPathAfterRequires(path.get('body'));
            pathRequires.remove();
        },
    });
    
    const result = print(ast);
    const expected = '\n';
    
    t.equal(result, expected);
    t.end();
});
