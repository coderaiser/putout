'use strict';

const {test} = require('supertape');
const {
    traverse,
    parse,
    print,
    operator,
} = require('putout');

const {remove} = operator;

test('@putout/operate: remove', (t) => {
    const ast = parse('const a = 5');
    
    traverse(ast, {
        VariableDeclaration(path) {
            remove(path);
        },
    });
    
    const code = print(ast);
    const expected = '\n';
    
    t.equal(code, expected);
    t.end();
});

test('@putout/operate: remove: no scope', (t) => {
    const ast = parse('const a = 5');
    
    traverse(ast, {
        noScope: true,
        VariableDeclaration(path) {
            remove(path);
        },
    });
    
    const code = print(ast);
    const expected = '\n';
    
    t.equal(code, expected);
    t.end();
});

test('@putout/operate: remove: not found', (t) => {
    const source = `x ? a() : b();\n`;
    const ast = parse(source);
    
    traverse(ast, {
        ConditionalExpression: (path) => {
            const nextPath = path.getNextSibling();
            
            remove(nextPath);
        },
    });
    
    const code = print(ast);
    
    t.equal(code, source);
    t.end();
});
