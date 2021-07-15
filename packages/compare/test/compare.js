'use strict';

const test = require('supertape');
const {template, parse} = require('@putout/engine-parser');
const {traverse, types} = require('putout');
const {ExpressionStatement} = types;

const {
    compare,
    compareAll,
    compareAny,
    parseTemplate,
} = require('..');

test('compare: base is string', (t) => {
    const a = template.ast('const a = "hello"');
    const b = template.ast('const a = "__"');
    
    const result = compare(a, b);
    
    t.ok(result, 'should equal');
    t.end();
});

test('compare: false property', (t) => {
    const result = compare('async () => {}', '() => {}');
    
    t.notOk(result, 'should not equal');
    t.end();
});

test('compare: identifier', (t) => {
    const result = compare('hello', '__');
    
    t.ok(result, 'should equal');
    t.end();
});

test('compare: string literal: raw', (t) => {
    const ast1 = parse(`'madrun'`);
    const ast2 = parse(`"madrun"`);
    
    const result = compare(ast1, ast2);
    
    t.ok(result, 'should equal');
    t.end();
});

test('compare: literal', (t) => {
    const result = compare('"hi"', '"__"');
    
    t.ok(result, 'should equal');
    t.end();
});

test('compare: base is string: path', (t) => {
    const node = template.ast('const a = "hello"');
    const b = template.ast('const a = "__"');
    
    const result = compare({node}, b);
    
    t.ok(result, 'should equal');
    t.end();
});

test('compare: path: parent', (t) => {
    const path = getProgramPath('const a = "hello"');
    const subPath = path.get('body.0.declarations.0');
    
    const result = compare(subPath, 'const a = "__"');
    
    t.ok(result, 'should equal');
    t.end();
});

test('compare: base is string: no', (t) => {
    const a = template.ast('const a = 5');
    const b = template.ast('const a = "__"');
    
    const result = compare(a, b);
    
    t.notOk(result, 'should equal');
    t.end();
});

test('compare: base is any', (t) => {
    const a = template.ast('const a = {}');
    const b = template.ast('const a = __');
    
    const result = compare(a, b);
    
    t.ok(result, 'should equal');
    t.end();
});

test('compare: strings', (t) => {
    const result = compare('const a = {}', 'if (2 > 3)__');
    
    t.notOk(result, 'should equal');
    t.end();
});

test('compare: all: base is all', (t) => {
    const result = compareAll('const a = {}', [
        'const a  = __',
    ]);
    
    t.ok(result, 'should equal');
    t.end();
});

test('compare: all: base is all: no', (t) => {
    const result = compareAll('const a = {}', [
        'const a = " "',
        'const a  = "__"',
        'const a  = __',
    ]);
    
    t.notOk(result, 'should equal');
    t.end();
});

test('compare: any: base is any', (t) => {
    const result = compareAny('const a = {}', [
        'const a = " "',
        'const a  = "__"',
        'const a  = __',
    ]);
    
    t.ok(result, 'should equal');
    t.end();
});

test('compare: any: no path find', (t) => {
    const path = getProgramPath(`const t = 'hello'`);
    
    const result = compareAny(path, [
        '[__] = __[0]',
    ]);
    
    t.notOk(result);
    t.end();
});

test('compare: any: base is any: no', (t) => {
    const result = compareAny('const a = {}', [
        'const a = " "',
        'const a  = "__"',
    ]);
    
    t.notOk(result, 'should equal');
    t.end();
});

test('compare: template var', (t) => {
    const a = template.ast('const hello = "hello"');
    const b = template.ast('const __a = "__"');
    
    const result = compare(a, b);
    
    t.ok(result, 'should equal');
    t.end();
});

test('compare: __object: root', (t) => {
    const result = compare('({})', '__object');
    
    t.ok(result);
    t.end();
});

test('compare: __array: root', (t) => {
    const result = compare('[]', '__array');
    
    t.ok(result);
    t.end();
});

test('compare: __object', (t) => {
    const a = template.ast('const {} = d');
    const b = template.ast('const __object = __');
    
    const result = compare(a, b);
    
    t.ok(result);
    t.end();
});

test('compare: __object: array pattern', (t) => {
    const a = template.ast('const [] = d');
    const b = template.ast('const __object = __');
    
    const result = compare(a, b);
    
    t.notOk(result);
    t.end();
});

test('compare: __object: not equal', (t) => {
    const a = template.ast('const {a} = d');
    const b = template.ast('const __object = __');
    
    const result = compare(a, b);
    
    t.ok(result);
    t.end();
});

test('compare: __object: object expression', (t) => {
    const a = template.ast('const {a} = {}');
    const b = template.ast('const __ = __object');
    
    const result = compare(a, b);
    
    t.ok(result);
    t.end();
});

test('compare: __object: object expression: not equal', (t) => {
    const a = template.ast('const {a} = {a}');
    const b = template.ast('const __ = __object');
    
    const result = compare(a, b);
    
    t.ok(result);
    t.end();
});

test('compare: __array: array pattern', (t) => {
    const a = template.ast('const [] = d');
    const b = template.ast('const __array = __');
    
    const result = compare(a, b);
    
    t.ok(result);
    t.end();
});

test('compare: __array: object pattern', (t) => {
    const a = template.ast('const {} = d');
    const b = template.ast('const __array = __');
    
    const result = compare(a, b);
    
    t.notOk(result);
    t.end();
});

test('compare: __array: array pattern: not empty', (t) => {
    const a = template.ast('const [a] = d');
    const b = template.ast('const __array = __');
    
    const result = compare(a, b);
    
    t.ok(result);
    t.end();
});

test('compare: __array: array expression', (t) => {
    const a = template.ast('const [a] = []');
    const b = template.ast('const __ = __array');
    
    const result = compare(a, b);
    
    t.ok(result);
    t.end();
});

test('compare: __array: array expression: equal', (t) => {
    const a = template.ast('const a = [b]');
    const b = template.ast('const __ = __array');
    
    const result = compare(a, b);
    
    t.ok(result);
    t.end();
});

test('compare: array: strict', (t) => {
    const a = template.ast('const a = [b]');
    const b = template.ast('const __ = []');
    
    const result = compare(a, b);
    
    t.notOk(result);
    t.end();
});

test('compare: array: strict: same', (t) => {
    const a = template.ast('const a = [b]');
    const b = template.ast('const __ = [__a]');
    
    const result = compare(a, b);
    
    t.ok(result);
    t.end();
});

test('compare: object: strict', (t) => {
    const a = template.ast('const {hello} = y');
    const b = template.ast('const {} = m');
    
    const result = compare(a, b);
    
    t.notOk(result);
    t.end();
});

test('compare: object: strict: same', (t) => {
    const a = template.ast('const {hello} = y');
    const b = template.ast('const {__a} = m');
    
    const result = compare(a, b);
    
    t.notOk(result);
    t.end();
});

test('compare: __args', (t) => {
    const a = template.ast('(a, b) => {}');
    const b = template.ast('(__args) => __');
    
    const result = compare(a, b);
    
    t.ok(result);
    t.end();
});

test('compare: __object: top level', (t) => {
    const result = compare('obj = {x: 0}', '__ = __object');
    
    t.ok(result);
    t.end();
});

test('compare: class body', (t) => {
    const node = 'class Button extends Component {render(){}}';
    const nodeTmpl = 'class __ extends Component {}';
    const result = compare(node, nodeTmpl);
    
    t.ok(result);
    t.end();
});

test('compare: function block', (t) => {
    const node = '() => {alert()}';
    const nodeTmpl = '() => {}';
    const result = compare(node, nodeTmpl);
    
    t.ok(result);
    t.end();
});

test('compare: parse template: __object', (t) => {
    const [, type] = parseTemplate('__object');
    t.equal(type, 'ObjectPattern|ObjectExpression');
    t.end();
});

test('compare: parse template: __array', (t) => {
    const [, type] = parseTemplate('__array');
    t.equal(type, 'ArrayPattern|ArrayExpression');
    t.end();
});

test('compare: parse template: node', (t) => {
    const [node] = parseTemplate('hello');
    t.equal(node.type, 'Identifier');
    t.end();
});

test('compare: object: template: name: not equal', (t) => {
    const a = template.ast('hello = world + __b');
    const b = template.ast('__a = __a + __b');
    
    const result = compare(a, b);
    
    t.notOk(result);
    t.end();
});

test('compare: object: template: name: equal', (t) => {
    const a = template.ast('hello = hello + __b');
    const b = template.ast('__a = __a + __b');
    
    const result = compare(a, b);
    
    t.ok(result);
    t.end();
});

test('compare: object: template: expression', (t) => {
    const a = template.ast('for (const a of b) {}');
    const b = template.ast('for (const __ of __) __');
    
    const result = compare(a, b);
    
    t.ok(result);
    t.end();
});

test('compare: object: template: comments', (t) => {
    const a = template.ast('console.log(/* hello */)');
    const b = template.ast('__a.__b()');
    
    const result = compare(a, b);
    
    t.ok(result);
    t.end();
});

test('compare: __args', (t) => {
    const b = '__.forEach(__args)';
    const a = `
        Object.keys(a).forEach((x) => {
            console.log(x);
        });
    `;
    
    const result = compare(a, b);
    
    t.ok(result);
    t.end();
});

test('compare: linked node: literal', (t) => {
    const a = 'import hello from "world"';
    const b = 'import __a from "__b"';
    
    const result = compare(a, b);
    
    t.ok(result);
    t.end();
});

test('compare: linked node: __imports', (t) => {
    const a = 'import React, {Component} from "world"';
    const b = 'import __imports from "__b"';
    
    const result = compare(a, b);
    
    t.ok(result);
    t.end();
});

test('compare: expressions', (t) => {
    const a = template.ast('if (a) a()');
    const b = template.ast('if (__a) __a()');
    
    const result = compare(a, b);
    
    t.ok(result, 'should equal');
    t.end();
});

test('compare: __body', (t) => {
    const a = template.ast('() => {}');
    const b = template.ast('() => __body');
    
    const result = compare(a, b);
    
    t.ok(result, 'should equal');
    t.end();
});

test('compare: __body: no body', (t) => {
    const a = template.ast('() => x');
    const b = template.ast('() => __body');
    
    const result = compare(a, b);
    
    t.notOk(result, 'should equal');
    t.end();
});

test('compare: block', (t) => {
    const a = template.ast('if (typeof x === "function") x()');
    const b = template.ast('if (typeof __a === "function") {__a(__args)}');
    
    const result = compare(a, b);
    
    t.notOk(result, 'should not equal');
    t.end();
});

test('compare: __nop', (t) => {
    const a = '() => {}';
    const b = '__nop';
    
    const result = compare(a, b);
    
    t.ok(result, 'should equal');
    t.end();
});

test('compare: __nop: async', (t) => {
    const a = 'const a = async () => {}';
    const b = 'const __a = __nop';
    
    const result = compare(a, b);
    
    t.ok(result, 'should equal');
    t.end();
});

test('compare: __nop: not fn', (t) => {
    const a = 'const a = 5';
    const b = 'const __a = __nop';
    
    const result = compare(a, b);
    
    t.notOk(result);
    t.end();
});

test('compare: __nop: no block', (t) => {
    const a = 'const a = () => 5';
    const b = 'const __a = __nop';
    
    const result = compare(a, b);
    
    t.notOk(result);
    t.end();
});

test('compare: __object identifier', (t) => {
    const result = compare('print(__object)', 'print(__object)');
    
    t.notOk(result);
    t.end();
});

test('compare: string literal', (t) => {
    const result = compare('\'hello\' + x + \'world\'', '"__a" + __b + "__c"');
    
    t.ok(result);
    t.end();
});

test('compare: template string', (t) => {
    const result = compare('`hello`', '`__a`');
    
    t.ok(result);
    t.end();
});

test('compare: __identifier', (t) => {
    const result = compare('console.log("hello")', '__identifier.log(__args)');
    
    t.ok(result);
    t.end();
});

test('compare: __identifier', (t) => {
    const result = compare('console.log("hello")', '__identifier.log(__args)');
    
    t.ok(result);
    t.end();
});

test('compare: __identifier__a', (t) => {
    const result = compare('console.log("hello")', '__identifier__a.log(__args)');
    
    t.ok(result);
    t.end();
});

test('compare: __regexp: inner', (t) => {
    const result = compare('"".replace(/hello/g, "")', '__a.replace(/__b/, __c)');
    
    t.ok(result);
    t.end();
});

test('compare: innerComments', (t) => {
    const from = {
        type: 'StringLiteral',
        value: 'hello',
        innerComments: [],
    };
    const result = compare(from, '"hello"');
    
    t.ok(result);
    t.end();
});

test('compare: ts: importKind', (t) => {
    const result = compare('const a:any = 5', 'const __a: any = __b');
    
    t.ok(result);
    t.end();
});

test('compare: ts: exportKind', (t) => {
    const node = {
        type: 'ExportNamedDeclaration',
        specifiers: [],
        source: null,
        declaration: {
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                id: {
                    type: 'Identifier',
                    name: 'a',
                },
                init: {
                    type: 'NumericLiteral',
                    value: 5,
                },
            }],
            kind: 'const',
        },
    };
    
    const result = compare(node, 'export const __a = 5');
    
    t.ok(result);
    t.end();
});

test('compare: undefined', (t) => {
    const result = compare(undefined, '"hello"');
    
    t.notOk(result);
    t.end();
});

test('compare: member expression', (t) => {
    const node = template.ast('expect(root.toSource()).to.equal(`hello`)');
    const result = compare(ExpressionStatement(node), 'expect(root.toSource()).to.equal(__d)');
    
    t.ok(result);
    t.end();
});

test('compare: if', (t) => {
    const result = compare('if (a) alert()', 'if (__a) __b; else __b');
    
    t.notOk(result);
    t.end();
});

test('compare: type', (t) => {
    const result = compare('if (a) alert()', 'IfStatement');
    
    t.ok(result);
    t.end();
});

test('compare: range: ignore', (t) => {
    const node = {
        type: 'Identifier',
        name: 'hello',
        range: [92, 95],
    };
    
    const template = {
        type: 'Identifier',
        name: 'hello',
        range: [24, 27],
    };
    
    const result = compare(node, template);
    
    t.ok(result);
    t.end();
});

test('compare: parent: ignore', (t) => {
    const node = {
        type: 'Identifier',
        name: 'hello',
        parent: {
        },
    };
    
    const template = {
        type: 'Identifier',
        name: 'hello',
        parent: null,
    };
    
    const result = compare(node, template);
    
    t.ok(result);
    t.end();
});

function getProgramPath(str) {
    let result;
    const ast = parse(str);
    
    traverse(ast, {
        Program(path) {
            result = path;
            path.stop();
        },
    });
    
    return result;
}
