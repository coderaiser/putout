'use strict';

const test = require('supertape');
const {traverse} = require('./traverse');
const {template} = require('@putout/engine-parser');

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

test('putout: traverse: path', (t) => {
    const node = template.ast('const x = 5');
    
    let found = false;
    const path = {
        node,
    };
    
    traverse(path, {
        Identifier() {
            found = true;
        },
    });
    
    t.ok(found);
    t.end();
});

