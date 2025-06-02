'use strict';

const test = require('supertape');
const montag = require('montag');
const {
    parse,
    print,
    traverse,
} = require('putout');

const {renameProperty} = require('./rename-property.js');

test('putout: operate: rename-property: rename', (t) => {
    const ast = parse('const {hello: x} = c; hello();');
    
    traverse(ast, {
        VariableDeclaration(path) {
            renameProperty(path, 'hello', 'world');
        },
    });
    
    const result = print(ast, {
        printer: 'putout',
    });
    
    const expected = montag`
        const {hello: x} = c;
        hello();\n
    `;
    
    t.equal(result, expected);
    t.end();
});
