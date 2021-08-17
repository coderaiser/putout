'use strict';

const test = require('supertape');
const {template, parse} = require('putout');

const {traverse, contains} = require('./traverse');

test('putout: traverse', (t) => {
    const node = template.ast(`
        async () => {
            for await (const a of b) {
            }
        }
    `);
    
    let illegal = true;
    
    traverse(node, {
        ReturnStatement(path) {
            illegal = false;
            path.stop();
        },
        
        'throw __'(path) {
            illegal = false;
            path.stop();
        },
        
        'await __'(path) {
            illegal = false;
            path.stop();
        },
        'for await (__ of __) __'(path) {
            illegal = false;
            path.stop();
        },
    });
    
    t.notOk(illegal);
    t.end();
});

test('putout: traverse: not found', (t) => {
    const node = template.ast('() => a = b');
    
    let illegal = true;
    
    traverse(node, {
        'a = c'() {
            illegal = false;
        },
    });
    
    t.ok(illegal);
    t.end();
});

test('putout: traverse: identifier', (t) => {
    const node = template.ast('const x = 5');
    
    let found = false;
    
    traverse(node, {
        Identifier() {
            found = true;
        },
    });
    
    t.ok(found);
    t.end();
});

test('putout: traverse: program: path', (t) => {
    const node = parse('const x = 5');
    
    let found = false;
    const path = {
        node,
    };
    
    traverse(path, {
        Identifier(path) {
            found = Boolean(path.scope);
        },
    });
    
    t.ok(found);
    t.end();
});

test('putout: traverse: program: template variables', (t) => {
    const node = parse('const x = 5');
    
    const path = {
        node,
    };
    
    let a;
    traverse(path, {
        'const __a = __b'(path, {__b}) {
            a = __b;
        },
    });
    
    t.equal(a.type, 'NumericLiteral');
    t.end();
});

test('putout: traverse: contains: not found', (t) => {
    const node = template.ast('() => x = 5');
    
    const result = contains(node, [
        'return __',
        'throw __',
        'await __',
        'for await (__ of __) __',
    ]);
    
    t.notOk(result, 'should not found');
    t.end();
});

test('putout: traverse: contains: found', (t) => {
    const node = template.ast('async () => await x');
    
    const result = contains(node, [
        'return __',
        'throw __',
        'await __',
        'for await (__ of __) __',
    ]);
    
    t.ok(result, 'should found');
    t.end();
});

