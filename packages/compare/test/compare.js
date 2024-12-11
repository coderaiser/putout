'use strict';

const test = require('supertape');
const montag = require('montag');

const {template, parse} = require('@putout/engine-parser');
const {traverse, types} = require('putout');

const {
    compare,
    compareAll,
    compareAny,
    parseTemplate,
} = require('..');

const {ExpressionStatement} = types;

test('compare: base is string', (t) => {
    const a = template.ast('const a = "hello"');
    const b = template.ast('const a = "__"');
    
    const result = compare(a, b);
    
    t.ok(result);
    t.end();
});

test('compare: false property', (t) => {
    const result = compare('async () => {}', '() => {}');
    
    t.notOk(result);
    t.end();
});

test('compare: identifier', (t) => {
    const result = compare('hello', '__');
    
    t.ok(result);
    t.end();
});

test('compare: string literal: raw', (t) => {
    const ast1 = parse(`'madrun'`);
    const ast2 = parse(`"madrun"`);
    
    const result = compare(ast1, ast2);
    
    t.ok(result);
    t.end();
});

test('compare: literal', (t) => {
    const result = compare('"hi"', '"__"');
    
    t.ok(result);
    t.end();
});

test('compare: base is string: path', (t) => {
    const node = template.ast('const a = "hello"');
    const b = template.ast('const a = "__"');
    
    const result = compare({node}, b);
    
    t.ok(result);
    t.end();
});

test('compare: path: parent', (t) => {
    const path = getProgramPath('const a = "hello"');
    const subPath = path.get('body.0.declarations.0');
    
    const result = compare(subPath, 'const a = "__"');
    
    t.ok(result);
    t.end();
});

test('compare: path: parent: no findUp', (t) => {
    const path = getProgramPath('const a = "hello"');
    const subPath = path.get('body.0.declarations.0');
    
    const result = compare(subPath, 'const a = "__"', {
        findUp: false,
    });
    
    t.notOk(result);
    t.end();
});

test('compare: path: compareAny: no findUp', (t) => {
    const path = getProgramPath('const a = "hello"');
    const subPath = path.get('body.0.declarations.0');
    
    const result = compareAny(subPath, ['const a = "__"'], {
        findUp: false,
    });
    
    t.notOk(result, 'should not find');
    t.end();
});

test('compare: path: compareAll: no findUp', (t) => {
    const path = getProgramPath('const a = "hello"');
    const subPath = path.get('body.0.declarations.0');
    
    const result = compareAll(subPath, ['const a = "__"'], {
        findUp: false,
    });
    
    t.notOk(result, 'should not find');
    t.end();
});

test('compare: base is string: no', (t) => {
    const a = template.ast('const a = 5');
    const b = template.ast('const a = "__"');
    
    const result = compare(a, b);
    
    t.notOk(result);
    t.end();
});

test('compare: base is any', (t) => {
    const a = template.ast('const a = {}');
    const b = template.ast('const a = __');
    
    const result = compare(a, b);
    
    t.ok(result);
    t.end();
});

test('compare: strings', (t) => {
    const result = compare('const a = {}', 'if (2 > 3)__');
    
    t.notOk(result);
    t.end();
});

test('compare: all: base is all', (t) => {
    const result = compareAll('const a = {}', ['const a  = __']);
    
    t.ok(result);
    t.end();
});

test('compare: all: not array', (t) => {
    const result = compareAll('const a = {}', 'const a  = __');
    
    t.ok(result);
    t.end();
});

test('compare: all: base is all: no', (t) => {
    const result = compareAll('const a = {}', ['const a = " "', 'const a  = "__"', 'const a  = __']);
    
    t.notOk(result);
    t.end();
});

test('compare: any: base is any', (t) => {
    const result = compareAny('const a = {}', ['const a = " "', 'const a  = "__"', 'const a  = __']);
    
    t.ok(result);
    t.end();
});

test('compare: any: not an array', (t) => {
    const result = compareAny('const a = {}', 'const a  = __');
    
    t.ok(result);
    t.end();
});

test('compare: any: no path find', (t) => {
    const path = getProgramPath(`const t = 'hello'`);
    
    const result = compareAny(path, ['[__] = __[0]']);
    
    t.notOk(result);
    t.end();
});

test('compare: any: base is any: no', (t) => {
    const result = compareAny('const a = {}', ['const a = " "', 'const a  = "__"']);
    
    t.notOk(result);
    t.end();
});

test('compare: template var', (t) => {
    const a = template.ast('const hello = "hello"');
    const b = template.ast('const __a = "__"');
    
    const result = compare(a, b);
    
    t.ok(result);
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

test('compare: __args: nodes', (t) => {
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

test('compare: linked node: __exports', (t) => {
    const a = 'export {scan, fix}';
    const b = 'export {__exports}';
    
    const result = compare(a, b);
    
    t.ok(result);
    t.end();
});

test('compare: expressions', (t) => {
    const a = template.ast('if (a) a()');
    const b = template.ast('if (__a) __a()');
    
    const result = compare(a, b);
    
    t.ok(result);
    t.end();
});

test('compare: __body', (t) => {
    const a = template.ast('() => {}');
    const b = template.ast('() => __body');
    
    const result = compare(a, b);
    
    t.ok(result);
    t.end();
});

test('compare: __body: inside FunctionDeclaration', (t) => {
    const a = `function hello() {return 'world'}`;
    const b = 'function __a() {__body}';
    
    const result = compare(a, b);
    
    t.ok(result);
    t.end();
});

test('compare: __body: if', (t) => {
    const a = 'if (a) {x = 3;}';
    const b = 'if (__a) __b; else __body';
    
    const result = compare(a, b);
    
    t.notOk(result);
    t.end();
});

test('compare: __body: only', (t) => {
    const a = '{}';
    const b = '__body';
    
    const result = compare(a, b);
    
    t.ok(result);
    t.end();
});

test('compare: __body: no body', (t) => {
    const a = template.ast('() => x');
    const b = template.ast('() => __body');
    
    const result = compare(a, b);
    
    t.notOk(result);
    t.end();
});

test('compare: block', (t) => {
    const a = template.ast('if (typeof x === "function") x()');
    const b = template.ast('if (typeof __a === "function") {__a(__args)}');
    
    const result = compare(a, b);
    
    t.notOk(result);
    t.end();
});

test('compare: __nop', (t) => {
    const a = '() => {}';
    const b = '__nop';
    
    const result = compare(a, b);
    
    t.ok(result);
    t.end();
});

test('compare: __nop: async', (t) => {
    const a = 'const a = async () => {}';
    const b = 'const __a = __nop';
    
    const result = compare(a, b);
    
    t.ok(result);
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

test('compare: string literal: expression', (t) => {
    const result = compare(`'hello' + x + 'world'`, '"__a" + __b + "__c"');
    
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

test('compare: __identifier__a: only', (t) => {
    const result = compare('temp', '__identifier__a');
    
    t.ok(result);
    t.end();
});

test('compare: __bool', (t) => {
    const result = compare('const a = true', 'const a = __bool');
    
    t.ok(result);
    t.end();
});

test('compare: __bool__a', (t) => {
    const result = compare('const a = true', 'const a = __bool__a');
    
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

test('compare: __regexp: top level', (t) => {
    const result = compare('/hello/u', '/__a/');
    
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

test('compare: import: ignore phase', (t) => {
    const node = template.ast.fresh(`import tryCatch from 'try-catch'`);
    delete node.phase;
    const result = compare(node, `import tryCatch from 'try-catch'`);
    
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
        assertions: [],
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

test('compare: Identifier: __a', (t) => {
    const result = compare('_temp11', '__a');
    
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
        parent: {},
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

test('compare: string literal', (t) => {
    const result = compare('"hello"', '__a');
    
    t.ok(result);
    t.end();
});

test('compare: both values are empty', (t) => {
    const result = compare('', '');
    
    t.ok(result);
    t.end();
});

test('compare: jsx: JSXText', (t) => {
    const result = compare('<h1>hello</h1>', '<h1>__a</h1>');
    
    t.ok(result);
    t.end();
});

test('compare: jsx: inner', (t) => {
    const result = compare('<Head><title>My page title</title></Head>', '<Head>__</Head>');
    
    t.ok(result);
    t.end();
});

test('compare: jsx: tag', (t) => {
    const result = compare('<title>My page title</title>', '<__a>__</__a>');
    
    t.ok(result);
    t.end();
});

test('compare: jsx: tag: same text', (t) => {
    const result = compare('<title>My page title</title>', '<__a>My page title</__a>');
    
    t.ok(result);
    t.end();
});

test('compare: jsx: tag: nested', (t) => {
    const result = compare('<html><head>Hello</head></html>', '<__a><__b>Hello</__b></__a>');
    
    t.ok(result);
    t.end();
});

test('compare: jsx: __jsx_attributes', (t) => {
    const result = compare('<title as={Input}>My page title</title>', '<__a __jsx_attributes>__</__a>');
    
    t.ok(result);
    t.end();
});

test('compare: jsx: __jsx_attributes: couple', (t) => {
    const result = compare('<title as={Input} name={name}>My page title</title>', '<__a __jsx_attributes>__</__a>');
    
    t.ok(result);
    t.end();
});

test('compare: jsx: __jsx_attributes: no children', (t) => {
    const result = compare('<title as={Input}/>', '<__a __jsx_attributes/>');
    
    t.ok(result);
    t.end();
});

test('compare: jsx: JSXText: whitespaces', (t) => {
    const template = montag`
        <Link href="/about">
            <a>About</a>
        </Link>
    `;
    
    const node = montag`
        <Link href="/about">
          <a>About</a>
        </Link>
    `;
    
    const result = compare(node, template);
    
    t.ok(result);
    t.end();
});

test('compare: jsx: expression', (t) => {
    const result = compare('<div className={x}></div>', '<div className={__a}></div>');
    
    t.ok(result);
    t.end();
});

test('compare: jsx: children', (t) => {
    const result = compare('<div className="abc"><span>hello</span></div>', '<div className="__a">__jsx_children</div>');
    
    t.ok(result);
    t.end();
});

test('compare: jsx: children: no', (t) => {
    const result = compare('<div className="abc"></div>', '<div className="__a">__jsx_children</div>');
    
    t.ok(result);
    t.end();
});

test('compare: typescript: keyof', (t) => {
    const node = 'type R = {[P in keyof Todo]: Todo[P];}';
    const template = 'type __a = {[__b in keyof __c]: __c[__b];}';
    const result = compare(node, template);
    
    t.ok(result);
    t.end();
});

test('compare: typescript: arrow function type', (t) => {
    const node = `(): boolean => name.startsWith('__')`;
    const template = `(__args__a) => __a.__b(__args__a)`;
    const result = compare(node, template);
    
    t.notOk(result);
    t.end();
});

test('compare: typescript: type reference: TSTypeReference ~> Identifier <--> TSStringKeyword', (t) => {
    const node = `async function isString(): Promise<string> {}`;
    const template = `async function __a(): Promise<__b> {}`;
    const result = compare(node, template);
    
    t.ok(result);
    t.end();
});

test('compare: typescript: arrow function type: no args', (t) => {
    const node = `(): boolean => name.startsWith()`;
    const template = `() => __a.__b()`;
    
    const result = compare(node, template);
    
    t.ok(result);
    t.end();
});

test('compare: __args__a', (t) => {
    const node = '((a) => fn(42))(value)';
    const template = '((__args__a) => __c(__args__a))(__args__b)';
    
    const result = compare(node, template);
    
    t.notOk(result);
    t.end();
});

test('compare: no template', (t) => {
    const node = 'const a = 5';
    const template = null;
    const result = compare(node, template);
    
    t.notOk(result);
    t.end();
});

test('compare: template literal', (t) => {
    const result = compare('`__a${_temp}__c`', '`__a${__identifier__b}__c`');
    
    t.ok(result);
    t.end();
});

test('compare: template literal: different', (t) => {
    const result = compare('`hello${abc}`', '`${__identifier__b}`');
    
    t.notOk(result);
    t.end();
});

test('compare: template literal: __a', (t) => {
    const result = compare('`hello${_temp}world`', '`__a${__identifier__b}__c`');
    
    t.ok(result);
    t.end();
});

test('compare: TSExportAssignment', (t) => {
    const result = compare('export = 5', 'export = __a');
    
    t.ok(result);
    t.end();
});

test('compare: TSTypeParameters', (t) => {
    const result = compare('function clear<es, ax, di>(): ret {}', 'function __a<__type_params>(): __c {__body}');
    
    t.ok(result);
    t.end();
});

test('compare: TSTypeParameters: no', (t) => {
    const result = compare('function clear(): ret {}', 'function __a<__type_params>(): __c {__body}');
    
    t.notOk(result);
    t.end();
});

test('compare: TSMappedType', (t) => {
    const result = compare('type A = Partial<B>', 'type __a = {[__b in keyof __c]?: __c[__b];}');
    
    t.notOk(result);
    t.end();
});

test('compare: different template values', (t) => {
    const result = compare('__b.body.length === 1 && __c.body.length === 1', '__a && __a');
    
    t.notOk(result);
    t.end();
});

test('compare: different template values: literals', (t) => {
    const result = compare(`isNameStr('__a') && isNameStr('__b')`, '__a && __a');
    
    t.notOk(result);
    t.end();
});

test('compareAny: node is null', (t) => {
    const result = compareAny('a => isIdentifier(a, {\n  name: BODY\n})', ['(__args__a) => __a.__b(__args__a)', '(__args__a) => {__a.__b(__args__a)}']);
    
    t.notOk(result);
    t.end();
});

test('compare: same member expressions', (t) => {
    const result = compare('hello.world && hello.world && ls && hello.world', '__a && __a && __b && __a');
    
    t.ok(result);
    t.end();
});

test('compare: different literals', (t) => {
    const result = compare('/.tsx?$/.test(name) || /{tsx?}$/.test(name)', '__a || __a');
    
    t.notOk(result);
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
