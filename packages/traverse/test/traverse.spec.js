'use strict';

const test = require('supertape');
const traverse = require('..');
const putout = require('putout');
const {parse, generate} = putout;

const convertMathPow = require('@putout/plugin-convert-math-pow');

test('putout: traverse: generate', (t) => {
    const input = 'var a = 5;';
    const ast = parse(input);
    
    traverse(ast, {
        VariableDeclarator(path) {
            path.id.name = 'b';
        },
    });
    
    const {code} = generate(ast);
    const expected = 'var b = 5;';
    
    t.equal(code, expected, 'should equal');
    t.end();
});

test('putout: traverse: plugin', (t) => {
    const plugin = {
        fix: (path) => {
            path.name = 'b';
        },
        report: () => '',
        find: (ast, {push, traverse}) => {
            traverse(ast, {
                Identifier(path) {
                    push(path);
                },
            });
        },
    };
    
    const input = 'var a = 5;';
    const {code} = putout(input, {
        fix: true,
        plugins: [{
            'rename': plugin,
        }],
    });
    
    const expected = 'var b = 5;';
    
    t.equal(code, expected, 'should equal');
    t.end();
});

test('putout: traverse: raw', (t) => {
    const input = 'Math.pow(2, 8)';
    const {code} = putout(input, {
        fix: true,
        plugins: [{
            'convert-math-pow': convertMathPow,
        }],
    });
    
    const expected = '2 ** 8';
    
    t.equal(code, expected, 'should equal');
    t.end();
});

test('putout: traverse: exit', (t) => {
    const input = 'var a = 5;';
    const ast = parse(input);
    
    traverse(ast, {
        VariableDeclarator: {
            exit(path) {
                path.id.name = 'b';
            },
        },
    });
    
    const {code} = generate(ast);
    const expected = 'var b = 5;';
    
    t.equal(code, expected, 'should equal');
    t.end();
});

