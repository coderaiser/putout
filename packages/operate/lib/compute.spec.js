'use strict';

const {parse, operator} = require('putout');
const {test} = require('supertape');
const {compute} = require('./compute');

const {traverse} = operator;

const COMPUTED = true;
const NOT_COMPUTED = false;

test('operate: compute: Identifier: ObjectProperty: not computed', (t) => {
    let result;
    
    const ast = parse(`
        module.exports.replace = () => ({
            debugger: '',
        });
    `);
    
    traverse(ast, {
        __a: (path) => {
            if (path.node.name === 'debugger')
                result = compute(path);
        },
    });
    
    const expected = [COMPUTED, 'debugger'];
    
    t.deepEqual(result, expected);
    t.end();
});

test('operate: compute: Literal', (t) => {
    let result;
    
    const ast = parse(`
        const bodies = 'hello';
        console.log(bodies);
    `);
    
    traverse(ast, {
        '"__a"': (path) => {
            result = compute(path);
        },
    });
    
    const expected = [true, 'hello'];
    
    t.deepEqual(result, expected);
    t.end();
});

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

test('operate: compute: boolean', (t) => {
    let result;
    
    const ast = parse(`
        const b = 5;
        const a = b;
        
        module.exports.replace = () => ({
            [a]: '',
        });
    `);
    
    traverse(ast, {
        ObjectProperty: (path) => {
            result = compute(path.get('key'));
        },
    });
    
    const expected = [true, 5];
    
    t.deepEqual(result, expected);
    t.end();
});

test('operate: compute: binary expression', (t) => {
    let result;
    
    const ast = parse(`
        const a = {
            b: 5,
        };
        
        if (a.b === 5)
            return;
    `);
    
    traverse(ast, {
        BinaryExpression: (path) => {
            result = compute(path);
        },
    });
    
    const expected = [true, true];
    
    t.deepEqual(result, expected);
    t.end();
});

test('operate: compute: binary expression: cannot compute left', (t) => {
    let result;
    
    const ast = parse(`
        if (x === 5)
            return;
    `);
    
    traverse(ast, {
        BinaryExpression: (path) => {
            result = compute(path);
        },
    });
    
    const expected = [NOT_COMPUTED];
    
    t.deepEqual(result, expected);
    t.end();
});

test('operate: compute: binary expression: cannot compute right', (t) => {
    let result;
    
    const ast = parse(`
        const a = {
            b: 5,
        };
        
        if (a.b === y)
            return;
    `);
    
    traverse(ast, {
        BinaryExpression: (path) => {
            result = compute(path);
        },
    });
    
    const expected = [NOT_COMPUTED];
    
    t.deepEqual(result, expected);
    t.end();
});

test('operate: compute: nested member expression', (t) => {
    let result;
    
    const ast = parse(`
        a.b.c === y
    `);
    
    traverse(ast, {
        BinaryExpression: (path) => {
            result = compute(path);
        },
    });
    
    const expected = [NOT_COMPUTED];
    
    t.deepEqual(result, expected);
    t.end();
});

test('operate: compute: member expression: function', (t) => {
    let result;
    
    const ast = parse(`
        a.b().c === y
    `);
    
    traverse(ast, {
        BinaryExpression: (path) => {
            result = compute(path);
        },
    });
    
    const expected = [NOT_COMPUTED];
    
    t.deepEqual(result, expected);
    t.end();
});

test('operate: compute: MemberExpression: computed', (t) => {
    let is;
    
    const ast = parse(`
        const a = {
            hello: 'world',
        };
        const b = {
            world: 'hello',
        };
        const c = a[hello] + b[world];
    `);
    
    traverse(ast, {
        BinaryExpression: (path) => {
            [is] = compute(path);
        },
    });
    
    t.notOk(is);
    t.end();
});

test('operate: compute: MemberExpression: nested', (t) => {
    let is;
    
    const ast = parse(`
        const a = {
            b: 0,
            c: d.length,
        }
        if (a.b > a.c)
            return;
        `);
    
    traverse(ast, {
        BinaryExpression: (path) => {
            [is] = compute(path);
        },
    });
    
    t.notOk(is);
    t.end();
});
