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
