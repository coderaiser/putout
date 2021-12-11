'use strict';

const {parse, operator} = require('putout');
const {test} = require('supertape');
const {compute} = require('./compute');

const {traverse} = operator;

test('operate: compute: Identifier: Literal', (t) => {
    let result;
    
    const ast = parse(`
        const bodies = 'hello';
        console.log(bodies);
    `);
    
    traverse(ast, {
        'console.log(__a)': (path) => {
            result = compute(path.get('arguments.0'));
        },
    });
    
    const expected = [true, 'hello'];
    
    t.deepEqual(result, expected);
    t.end();
});

test('operate: compute: Identifier', (t) => {
    let is = true;
    
    const ast = parse(`
        const bodies = hello;
        console.log(bodies);
    `);
    
    traverse(ast, {
        'console.log(__a)': (path) => {
            [is] = compute(path.get('arguments.0'));
        },
    });
    
    t.notOk(is);
    t.end();
});

test('operate: compute: MemberExpression', (t) => {
    let value;
    
    const ast = parse(`
        const bodies = {
            function: 'hello',
        }
        
        log(bodies.function);
    `);
    
    traverse(ast, {
        '__a.__b': (path) => {
            [, value] = compute(path);
        },
    });
    
    t.equal(value, 'hello');
    t.end();
});

test('operate: compute: ArrayExpression', (t) => {
    let is = true;
    
    const ast = parse(`
        const bodies = {
            function: 'hello',
        }
        
        log(bodies());
    `);
    
    traverse(ast, {
        'bodies()': (path) => {
            [is] = compute(path);
        },
    });
    
    t.notOk(is);
    t.end();
});

test('operate: compute: MemberExpression: no property', (t) => {
    let is;
    
    const ast = parse(`
        const bodies = {
        }
        
        log(bodies.function);
    `);
    
    traverse(ast, {
        '__a.__b': (path) => {
            [is] = compute(path);
        },
    });
    
    t.notOk(is);
    t.end();
});

test('operate: compute: MemberExpression: is', (t) => {
    let is;
    
    const ast = parse(`
        const bodies = {
            function: 'hello',
        }
        
        log(bodies.function);
    `);
    
    traverse(ast, {
        '__a.__b': (path) => {
            [is] = compute(path);
        },
    });
    
    t.ok(is);
    t.end();
});

test('operate: compute: not', (t) => {
    let is;
    
    const ast = parse(`
        const bodies = {
            function: 'hello',
        }
    `);
    
    traverse(ast, {
        '__a.__b': (path) => {
            [is] = compute(path);
        },
    });
    
    t.notOk(is);
    t.end();
});

