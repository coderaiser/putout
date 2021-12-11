'use strict';

const {parse, operator} = require('putout');
const {test} = require('supertape');
const {traverse} = operator;

const {getBinding} = require('./get-binding');

test('operate: get-binding: current scope', (t) => {
    let result;
    
    const ast = parse(`const hello = 'world'`);
    
    traverse(ast, {
        Identifier(path) {
            const binding = getBinding(path, 'hello');
            result = binding.path.toString();
        },
    });
    
    t.equal(result, `hello = 'world'`);
    t.end();
});

test('operate: get-binding: upper scope', (t) => {
    let result;
    
    const ast = parse(`
        const upper = 'scope'
        
        function x() {
            return 'y';
        }
    `);
    
    traverse(ast, {
        'return __a'(path) {
            const binding = getBinding(path, 'upper');
            result = binding.path.toString();
        },
    });
    
    t.equal(result, `upper = 'scope'`);
    t.end();
});

test('operate: get-binding: no', (t) => {
    let result;
    
    const ast = parse(`
        const upper = 'scope'
        
        function x() {
            return 'y';
        }
    `);
    
    traverse(ast, {
        'return __a'(path) {
            result = getBinding(path, 'hello');
        },
    });
    
    t.notOk(result);
    t.end();
});
