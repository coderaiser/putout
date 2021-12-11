'use strict';

const {parse, operator} = require('putout');
const {test} = require('supertape');
const {traverse} = operator;

const {getBinding, getBindingPath} = require('./get-binding');

test('operate: getBinding: current scope', (t) => {
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

test('operate: getBinding: upper scope', (t) => {
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

test('operate: getBinding: no', (t) => {
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

test('operate: getBindingPath: same', (t) => {
    let binding;
    let bindingPath;
    
    const ast = parse(`const hello = 'world'`);
    
    traverse(ast, {
        Identifier(path) {
            binding = getBinding(path, 'hello');
            bindingPath = getBindingPath(path, 'hello');
        },
    });
    
    t.equal(binding.path, bindingPath);
    t.end();
});

test('operate: getBindingPath: no', (t) => {
    let result;
    
    const ast = parse(`
        const upper = 'scope'
        
        function x() {
            return 'y';
        }
    `);
    
    traverse(ast, {
        'return __a'(path) {
            result = getBindingPath(path, 'hello');
        },
    });
    
    t.notOk(result);
    t.end();
});
