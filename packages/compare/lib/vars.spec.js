'use strict';

const tryCatch = require('try-catch');

const test = require('supertape');
const putout = require('putout');
const montag = require('montag');
const {parse, template} = require('@putout/engine-parser');

const {compare} = require('./compare');
const {getTemplateValues} = require('./vars');

const noop = () => {};
const {types, generate} = putout;

const {
    RegExpLiteral,
    StringLiteral,
    isExpression,
} = types;

test('putout: compare: vars: getTemplateValues', (t) => {
    const addVar = {
        report: () => '',
        filter: ({node}) => {
            const {body} = node;
            const [first] = body.body;
            const {__i} = getTemplateValues(node, 'for (let __i = 0; __i < __n; __i++) __c');
            
            return compare(first, `const __a = __b[${__i.name}]`);
        },
        replace: () => ({
            'for (let __i = 0; __i < __n; __i++) __c': ({__c, __i}) => {
                const [node] = __c.body;
                const {__a, __b} = getTemplateValues(node, `const __a = __b[${__i.name}]`);
                
                __c.body.shift();
                
                return `for (const ${__a.name} of ${__b.name}) __c`;
            },
        }),
    };
    
    const input = 'for (let i = 0; i < n; i++) {const item = items[i]; log(item);}';
    
    const {code} = putout(input, {
        plugins: [{
            'convert-for-to-for-of': addVar,
        }],
    });
    
    const expected = 'for (const item of items) {\n    log(item);\n}\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: getTemplateValues: setValues: BlockStatement', (t) => {
    const addVar = {
        report: () => '',
        replace: () => ({
            'if (__a) __b': 'if (1) if (__a) __b',
        }),
    };
    
    const input = 'if (1) {hello();}';
    
    const {code} = putout(input, {
        printer: 'putout',
        plugins: [{
            'convert-for-to-for-of': addVar,
        }],
    });
    
    const expected = montag`
         if (1)
             if (1) {
                 hello();
             }\n
      `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: getTemplateValues: setValues: Statement', (t) => {
    const addVar = {
        report: () => '',
        replace: () => ({
            'if (__a) __b': 'if (1) if (__a) __b',
        }),
    };
    
    const input = 'if (1) if (2) 3';
    
    const {parse, transform} = putout;
    
    const ast = parse(input);
    
    transform(ast, input, {
        plugins: [{
            'convert-for-to-for-of': addVar,
        }],
    });
    
    t.equal(ast.program.body[0].consequent.consequent.type, 'IfStatement');
    t.end();
});

test('putout: compare: vars: getTemplateValues: no template', (t) => {
    const node = template.ast('const [] = array');
    const [error] = tryCatch(getTemplateValues, node);
    
    t.equal(error.message, `☝️ Looks like argument 'template' of 'getTemplateValues(node, template)': is not a string, but 'undefined'`);
    t.end();
});

test('putout: compare: vars: getTemplateValues: __array', (t) => {
    const node = template.ast('const [] = array');
    const {__array} = getTemplateValues(node, 'const __array = __');
    
    t.equal(__array?.type, 'ArrayPattern');
    t.end();
});

test('putout: compare: vars: getTemplateValues: path', (t) => {
    const node = template.ast('const [] = array');
    
    const path = {
        node,
    };
    
    const {__array} = getTemplateValues(path, 'const __array = __');
    
    t.equal(__array?.type, 'ArrayPattern');
    t.end();
});

test('putout: compare: vars: getTemplateValues: __', (t) => {
    const node = template.ast('const [] = array');
    const {__} = getTemplateValues(node, 'const __array = __');
    
    t.equal(__?.type, 'Identifier');
    t.end();
});

test('putout: compare: vars: getTemplateValues: __object', (t) => {
    const node = template.ast('const {} = obj');
    const {__object} = getTemplateValues(node, 'const __object = __');
    
    t.equal(__object.type, 'ObjectPattern');
    t.end();
});

test('putout: compare: vars: vars: setValues : __args', (t) => {
    const applyToSpread = {
        report: () => '',
        replace: () => ({
            'function __a(__args){}': 'const __a = (__args) => {}',
        }),
    };
    
    const {code} = putout('function hello(a, b, c){}', {
        plugins: [{
            'convert-to-arrow': applyToSpread,
        }],
    });
    
    const expected = 'const hello = (a, b, c) => {};\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: __imports', (t) => {
    const applyToSpread = {
        report: () => '',
        replace: () => ({
            'import __imports from "__a"': ({__imports, __a}) => {
                let result = 'const {\n';
                
                for (const {imported} of __imports) {
                    result += `${imported.name},`;
                }
                
                result += `\n} = require(${__a.raw});`;
                
                return result;
            },
        }),
    };
    
    const {code} = putout('import {hello} from "world"', {
        plugins: [{
            'convert-esm-to-commonjs': applyToSpread,
        }],
    });
    
    const expected = `const {hello} = require('world');\n`;
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: __imports: set', (t) => {
    const removeQuotes = {
        report: () => '',
        replace: () => ({
            'import __imports from "__a" with {"type": "__b"}': 'import __imports from "__a" with {type: "__b"}',
        }),
    };
    
    const source = 'import json from "./mod.json" with { "type": "json" };';
    
    const {code} = putout(source, {
        plugins: [{
            'remove-quotes': removeQuotes,
        }],
    });
    
    const expected = `import json from './mod.json' with { type: 'json' };\n`;
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: __imports: no extra', (t) => {
    const source = 'import json from "./mod.json" with { "type": "json" };';
    
    const ast = parse(source);
    
    const result = ast.program.body[0].specifiers.extra;
    
    t.notOk(result);
    t.end();
});

test('putout: compare: vars: __exports', (t) => {
    const applyToSpread = {
        report: () => '',
        replace: () => ({
            'export {__exports}': ({__exports}) => {
                let result = 'module.exports = {\n';
                
                for (const {local} of __exports) {
                    result += `${local.name},`;
                }
                
                result += `\n}`;
                
                return result;
            },
        }),
    };
    
    const {code} = putout('export {hello, world}', {
        plugins: [{
            'convert-esm-to-commonjs': applyToSpread,
        }],
    });
    
    const expected = montag`
        module.exports = {
            hello,
            world,
        };\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: identifier', (t) => {
    const varToConst = {
        report: () => '',
        replace: () => ({
            '!!__a': '__a',
        }),
    };
    
    const {code} = putout('if (!!y) fn()', {
        fixCount: 1,
        plugins: [{
            'var-to-const': varToConst,
        }],
    });
    
    const expected = 'if (y)\n    fn();\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: findVarsWays: __object', (t) => {
    const convert = {
        report: () => '',
        replace: () => ({
            __object: ({__object}) => {
                const {code} = generate(__object);
                return `(${code})`;
            },
        }),
    };
    
    const source = montag`
        fn({a, b, c})
    `;
    
    const expected = montag`
        fn({
            a,
            b,
            c,
        });\n
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['convert', convert],
        ],
    });
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: findVarsWays: jsx: JSXName', (t) => {
    const convert = {
        report: () => '',
        replace: () => ({
            '<h1>__a</h1>': '<h2>__a</h2>',
        }),
    };
    
    const source = '<h1>hello</h1>;';
    const expected = '<h2>hello</h2>;\n';
    
    const {code} = putout(source, {
        plugins: [
            ['convert', convert],
        ],
    });
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: findVarsWays: jsx: JSXAttribute', (t) => {
    const convert = {
        report: () => '',
        replace: () => ({
            '<h1 className="__a">__b</h1>': '<h1 class="__a">__b</h1>',
        }),
    };
    
    const source = '<h1 className="abc">hello</h1>;';
    const expected = '<h1 class="abc">hello</h1>;\n';
    
    const {code} = putout(source, {
        plugins: [
            ['convert', convert],
        ],
    });
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: findVarsWays: jsx: children: JSXText', (t) => {
    const convert = {
        report: () => '',
        replace: () => ({
            '<h1 className="__a">__jsx_children</h1>': '<h1 class="__a">__jsx_children</h1>',
        }),
    };
    
    const source = '<h1 className="abc">hello</h1>;';
    const expected = '<h1 class="abc">hello</h1>;\n';
    
    const {code} = putout(source, {
        plugins: [
            ['convert', convert],
        ],
    });
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: jsx: JSXText: switch', (t) => {
    const convert = {
        report: () => '',
        replace: () => ({
            '<section><h1>__a</h1><h2>__b</h2></section>': '<section><h1>__b</h1><h2>__a</h2></section>',
        }),
    };
    
    const source = 'const a = <section><h1>hello</h1><h2>world</h2></section>';
    const expected = montag`
        const a = (
            <section><h1>world</h1><h2>hello</h2></section>
        );\n
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['convert', convert],
        ],
    });
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: findVarsWays: jsx: attributes', (t) => {
    const convert = {
        report: () => '',
        replace: () => ({
            '<__a __jsx_attributes/>': '<span __jsx_attributes/>',
        }),
    };
    
    const source = '<div className="abc" name="hello"/>;';
    const expected = '<span className="abc" name="hello"/>;\n';
    
    const {code} = putout(source, {
        plugins: [
            ['convert', convert],
        ],
    });
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: findVarsWays: jsx: children', (t) => {
    const convert = {
        report: () => '',
        replace: () => ({
            '<h1 className="__a">__jsx_children</h1>': '<h1 class="__a">__jsx_children</h1>',
        }),
    };
    
    const source = montag`
        <h1 className="abc">
            <a>hello</a>
            <a>world</a>
        </h1>;
    `;
    
    const expected = montag`
        <h1 class="abc">
            <a>hello</a>
            <a>world</a>
        </h1>;\n
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['convert', convert],
        ],
    });
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: findVarsWays: jsx: expression', (t) => {
    const convert = {
        report: () => '',
        replace: () => ({
            '<h1 className={__a}>{__b}</h1>': '<h1 className={__a}></h1>',
        }),
    };
    
    const source = '<h1 className={name}>{hello}</h1>;';
    const expected = '<h1 className={name}></h1>;\n';
    
    const {code} = putout(source, {
        plugins: [
            ['convert', convert],
        ],
    });
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: __args__a', (t) => {
    const varToConst = {
        report: () => '',
        replace: () => ({
            '(__args__a) => __b(__args__a)': '__b',
        }),
    };
    
    const input = 'const y = (a, b) => alert(a, b)';
    const expected = 'const y = alert;\n';
    
    const {code} = putout(input, {
        fixCount: 1,
        plugins: [{
            'var-to-const': varToConst,
        }],
    });
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: regexp', (t) => {
    const regexp = {
        report: () => '',
        replace: () => ({
            '__a.replace(/__b/, __c)': ({__b}, path) => {
                const {pattern} = __b;
                const regExpPath = path.get('arguments.0');
                
                regExpPath.replaceWith(StringLiteral(pattern));
                
                return path;
            },
        }),
    };
    
    const input = `'hello'.replace(/xxx/, 'world');`;
    const expected = `'hello'.replace('xxx', 'world');\n`;
    
    const {code} = putout(input, {
        plugins: [{
            regexp,
        }],
    });
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: regexp: top level', (t) => {
    const regexp = {
        report: () => '',
        replace: () => ({
            '/__b/': '',
        }),
    };
    
    const input = `let a = /hello/u;`;
    const expected = 'let a;\n';
    
    const {code} = putout(input, {
        plugins: [{
            regexp,
        }],
    });
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: "__a"', (t) => {
    const convertReplace = {
        report: () => '',
        replace: () => ({
            '__a.replace("__b", __c)': ({__b}, path) => {
                const value = __b.raw.slice(1, -1);
                
                const regexp = {
                    ...RegExpLiteral('xx', 'g'),
                    extra: {
                        raw: `/${escape(value)}/g`,
                    },
                };
                
                path
                    .get('arguments.0')
                    .replaceWith(regexp);
                return path.node;
            },
        }),
    };
    
    const input = `'hello'.replace(/l/g, 'x');\n`;
    
    const {code} = putout(input, {
        fixCount: 1,
        plugins: [
            ['convert-replace', convertReplace],
        ],
    });
    
    t.equal(code, input);
    t.end();
});

test('putout: compare: vars: `__a`', (t) => {
    const varToConst = {
        report: () => '',
        replace: () => ({
            'const x = `__a`': ({__a}) => {
                const {raw} = __a.value;
                return `const x = "${raw}"`;
            },
        }),
    };
    
    const input = 'const x = `hello`';
    const {code} = putout(input, {
        fixCount: 1,
        plugins: [{
            'var-to-const': varToConst,
        }],
    });
    
    const expected = `const x = 'hello';\n`;
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: template literal', (t) => {
    const addVar = {
        report: () => '',
        replace: () => ({
            '__a + "__b"': '`${__a}__b`',
        }),
    };
    
    const {code} = putout('a + "hello"', {
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    const expected = '`${a}hello`;\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: template literal: raw', (t) => {
    const addVar = {
        report: () => '',
        replace: () => ({
            '__a + "__b"': '`${__a}__b`',
        }),
    };
    
    const {code} = putout('a + "hello`"', {
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    const expected = '`${a}hello\\``;\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: EmptyStatement', (t) => {
    const convert = {
        report: noop,
        replace: () => ({
            'if(__a) __b': '__a && __b',
        }),
    };
    
    const source = montag`
        if (a)
            console.log();
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['convert', convert],
        ],
    });
    
    const expected = montag`
        a && console.log();\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: EmptyStatement: Statement', (t) => {
    const convert = {
        report: () => '',
        match: () => ({
            'if (__a) __b': ({__b}) => isExpression(__b),
        }),
        replace: () => ({
            'if (__a) __b': '__a && __b',
        }),
    };
    
    const source = montag`
        if (a)
            if (b) {}\n
    `;
    
    const {code} = putout(source, {
        plugins: [
            ['convert', convert],
        ],
    });
    
    t.equal(code, source);
    t.end();
});

test('putout: compare: vars: parens', (t) => {
    const convert = {
        report: noop,
        replace: () => ({
            'return __b': 'return (__b)',
        }),
    };
    
    const source = montag`
        return hello;
    `;
    
    const {code} = putout(source, {
        printer: 'putout',
        plugins: [
            ['convert', convert],
        ],
    });
    
    const expected = montag`
        return (hello);\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: getTemplateValues: setValues: __bool', (t) => {
    const plugin = {
        report: () => '',
        replace: () => ({
            'const __a = __bool__a': 'var __a = __bool__a || true',
        }),
    };
    
    const input = 'const x = false;';
    
    const {code} = putout(input, {
        printer: 'putout',
        plugins: [{
            plugin,
        }],
    });
    
    const expected = 'var x = false || true;\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: getTemplateValues: TSTypeReference', (t) => {
    const plugin = {
        report: () => '',
        replace: () => ({
            'async function __a(): Promise<__b> {}': 'const __a = async (): Promise<__b> => {}',
        }),
    };
    
    const input = 'async function get(): Promise<string>{}';
    
    const {code} = putout(input, {
        printer: 'putout',
        isTS: true,
        plugins: [{
            plugin,
        }],
    });
    
    const expected = 'const get = async (): Promise<string> => {};\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: getTemplateValues: TSTypeParameters', (t) => {
    const plugin = {
        report: () => '',
        replace: () => ({
            'function write<__a, __b, __c>() {__body}': 'function write<__c, __b, __a>() {__body}',
        }),
    };
    
    const input = 'function write<es, ax, di>() {}';
    const {code} = putout(input, {
        printer: 'putout',
        isTS: true,
        plugins: [{
            plugin,
        }],
    });
    
    const expected = 'function write<di, ax, es>() {}\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: getTemplateValues: __type_params', (t) => {
    const plugin = {
        report: () => '',
        match: () => ({
            'function write<__type_params>() {__body}'({__type_params}) {
                return __type_params.length > 2;
            },
        }),
        replace: () => ({
            'function write<__type_params>() {__body}'({__type_params}, path) {
                __type_params.pop();
                
                return path;
            },
        }),
    };
    
    const input = 'function write<di, ax, es>() {}';
    const {code} = putout(input, {
        printer: 'putout',
        isTS: true,
        plugins: [{
            plugin,
        }],
    });
    
    const expected = 'function write<di, ax>() {}\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: getTemplateValues: TSTypeReference 2', (t) => {
    const plugin = {
        report: () => '',
        replace: () => ({
            'async function __a(): Promise<__b> {}': 'async function __a(): __b {}',
        }),
    };
    
    const input = 'async function get(): Promise<string>{}';
    
    const {code} = putout(input, {
        printer: 'putout',
        isTS: true,
        plugins: [{
            plugin,
        }],
    });
    
    const expected = 'async function get(): string {}\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: putout: TSExportAssignment', (t) => {
    const convert = {
        report: noop,
        replace: () => ({
            'export default __a': 'export = __a',
        }),
    };
    
    const source = montag`
        export default 'hello';
    `;
    
    const {code} = putout(source, {
        printer: 'putout',
        plugins: [
            ['convert', convert],
        ],
    });
    
    const expected = montag`
        export = 'hello';\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: getTemplateValues: setValues: BlockStatement: FunctionDeclaration', (t) => {
    const plugin = {
        report: () => '',
        replace: () => ({
            'const __a = function __a(__args) {__body}': 'function __a(__args){__body}',
        }),
    };
    
    const input = `const a = function a() {const b = 5; return b}`;
    
    const {code} = putout(input, {
        printer: 'putout',
        plugins: [{
            'remove-useless-variable-declaration': plugin,
        }],
    });
    
    const expected = montag`
        function a() {
            const b = 5;
            return b;
        }\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: getTemplateValues: setValues: BlockStatement: ClassDeclaration', (t) => {
    const plugin = {
        report: () => '',
        replace: () => ({
            'export class __a {__body}': 'module.exports = class __a {__body}',
        }),
    };
    
    const input = `
        export class Emojizer {
            providedCodeActionKinds = [
                vscode.CodeActionKind.QuickFix
            ];
            
            provideCodeActions(document, range) {
            };
        }
    `;
    
    const {code} = putout(input, {
        printer: 'putout',
        plugins: [{
            'remove-useless-variable-declaration': plugin,
        }],
    });
    
    const expected = montag`
       module.exports = class Emojizer {
           providedCodeActionKinds = [vscode.CodeActionKind.QuickFix];
           provideCodeActions(document, range) {}
       };\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: getTemplateValues: setValues: setRawValue: Number', (t) => {
    const plugin = {
        report: () => '',
        replace: () => ({
            'String(__a)': '`${__a}`',
        }),
    };
    
    const input = `String(1)`;
    const {code} = putout(input, {
        plugins: [{
            'apply-template-literal': plugin,
        }],
    });
    
    const expected = '`${1}`;\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: getTemplateValues: setValues: TSMappedType', (t) => {
    const plugin = {
        report: () => '',
        replace: () => ({
            'type __a = {[__b in keyof __c]?: __c[__b];}': 'type __a = Partial<__c>',
            'type __a = {readonly [__b in keyof __c]: __c[__b];}': 'type __a = Readonly<__c>',
        }),
    };
    
    const input = montag`
        type SuperType1 = {
            readonly [Key in keyof Type]?: Type[Key];
        };
    `;
    
    const {code} = putout(input, {
        isTS: true,
        plugins: [
            ['apply-utility-types', plugin],
        ],
    });
    
    const expected = 'type SuperType1 = Partial<Type>;\n';
    
    t.equal(code, expected);
    t.end();
});
