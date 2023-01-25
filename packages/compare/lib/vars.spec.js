'use strict';

const tryCatch = require('try-catch');

const test = require('supertape');
const putout = require('putout');
const montag = require('montag');
const {template} = require('@putout/engine-parser');

const {compare} = require('./compare');
const {getTemplateValues} = require('./vars');

const {types, generate} = putout;
const {RegExpLiteral, StringLiteral} = types;

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
    
    const expected = 'for (const item of items) {\n  log(item);\n}';
    
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
        plugins: [{
            'convert-for-to-for-of': addVar,
        }],
    });
    
    const expected = 'if (1) if (1)\n  {hello();}';
    
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
    
    t.equal(__array && __array.type, 'ArrayPattern');
    t.end();
});

test('putout: compare: vars: getTemplateValues: path', (t) => {
    const node = template.ast('const [] = array');
    const path = {
        node,
    };
    
    const {__array} = getTemplateValues(path, 'const __array = __');
    
    t.equal(__array && __array.type, 'ArrayPattern');
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
    
    const expected = 'const hello = (a, b, c) => {};';
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: vars: __imports', (t) => {
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
    
    const expected = `const {\n  hello\n} = require('world');`;
    
    t.equal(code, expected);
    t.end();
});

test('putout: compare: vars: vars: identifier', (t) => {
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
    
    const expected = 'if (y) fn()';
    
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
          c
        })
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
    const expected = '<h2>hello</h2>;';
    
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
    const expected = '<h1 class="abc">hello</h1>;';
    
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
    const expected = '<h1 class="abc">hello</h1>;';
    
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
    const expected = '<span className="abc" name="hello" />;';
    
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
    
    const source = '<h1 className="abc"><a>hello</a> <a>world</a></h1>;';
    const expected = '<h1 class="abc"><a>hello</a> <a>world</a></h1>;';
    
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
    const expected = '<h1 className={name}></h1>;';
    
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
    const expected = 'const y = alert';
    
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
    const expected = `'hello'.replace('xxx', 'world');`;
    
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
                
                path.get('arguments.0').replaceWith(regexp);
                return path.node;
            },
        }),
    };
    
    const input = '"hello".replace(/l/g, "x")';
    
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
    
    const expected = `const x = 'hello';`;
    
    t.equal(code, expected);
    t.end();
});
