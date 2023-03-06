'use strict';

const {readFileSync} = require('fs');
const {join} = require('path');

const test = require('supertape');
const montag = require('montag');
const putout = require('putout');
const tryCatch = require('try-catch');

const {runPlugins} = require('..');

const {print, types} = putout;
const {StringLiteral} = types;

const readFixture = (a) => readFileSync(join(__dirname, 'fixture', `${a}.js`), 'utf8');

test('putout: runner: replace: same', (t) => {
    const addVar = {
        report: () => '',
        replace: () => ({
            'test(__a, (__args) => {})': 'test(__a, (__args) => {})',
        }),
    };
    
    const {code} = putout(`test('', (t) => {})`, {
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    const expected = `test('', t => {});`;
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: replace: same path, new transform', (t) => {
    const convert = {
        report: () => '',
        replace: () => ({
            'module.exports.__a = __b': 'export const __a = __b',
        }),
    };
    
    const source = montag`
        module.exports.set = () => {
        };
        
        module.exports.get = () => {
        };
    `;
    
    const {code} = putout(source, {
        runPlugins,
        plugins: [
            ['convert', convert],
        ],
    });
    
    const expected = montag`
        export const set = () => {
        };
        
        export const get = () => {
        };
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: replace: recursive overflow', (t) => {
    const convert = {
        report: () => '',
        replace: () => ({
            test: 'test.only',
        }),
    };
    
    const source = montag`
        test()
    `;
    
    const {code} = putout(source, {
        runPlugins,
        plugins: [
            ['convert', convert],
        ],
    });
    
    const expected = montag`
        test.only()
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: replace: __object', (t) => {
    const convert = {
        report: () => '',
        replace: () => ({
            __object: ({__object}) => {
                const code = print(__object);
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
        runPlugins,
        plugins: [
            ['convert', convert],
        ],
    });
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: replace: return __object', (t) => {
    const convert = {
        report: () => '',
        replace: () => ({
            __object: ({__object}) => __object,
        }),
    };
    
    const source = montag`
        fn({a, b, c})
    `;
    
    const {code} = putout(source, {
        runPlugins,
        plugins: [
            ['convert', convert],
        ],
    });
    
    t.equal(code, source);
    t.end();
});

test('putout: runner: replace: remove', (t) => {
    const rm = {
        report: () => '',
        replace: () => ({
            'for (__a of __array) __c': () => '',
        }),
    };
    
    const {code} = putout('for (const a of []) {}', {
        runPlugins,
        plugins: [
            ['rm', rm],
        ],
    });
    
    const expected = '';
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: replace: remove: comments', (t) => {
    const rm = {
        report: () => '',
        replace: () => ({
            'for (__a of __array) __c': () => '',
        }),
    };
    
    const source = montag`
        // some loop
        for (const a of []) {}
    `;
    const {code} = putout(source, {
        runPlugins,
        plugins: [
            ['rm', rm],
        ],
    });
    
    const expected = montag`
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: replace: remove: no node', (t) => {
    const rm = {
        report: () => '',
        replace: () => ({
            'process.exit()': '',
            'process["exit"]()': '',
        }),
    };
    
    const {code} = putout('const a = 5;process.exit()', {
        runPlugins,
        plugins: [
            ['rm', rm],
        ],
    });
    
    const expected = 'const a = 5;';
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: replace: options', (t) => {
    const rm = {
        report: () => '',
        replace: ({options}) => ({
            'process.exit()': options.code,
        }),
    };
    
    const {code} = putout('const a = 5;process.exit()', {
        runPlugins,
        rules: {
            rm: ['on', {
                code: 'debugger',
            }],
        },
        plugins: [
            ['rm', rm],
        ],
    });
    
    const expected = 'const a = 5;debugger;';
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: replace: match: options', (t) => {
    const rm = {
        report: () => '',
        match: ({options}) => ({
            'process.exit()': () => options.is,
        }),
        replace: ({options}) => ({
            'process.exit()': options.code,
        }),
    };
    
    const {code} = putout('const a = 5;process.exit()', {
        runPlugins,
        rules: {
            rm: ['on', {
                code: 'debugger',
                is: true,
            }],
        },
        plugins: [
            ['rm', rm],
        ],
    });
    
    const expected = 'const a = 5;debugger;';
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: replace: same function: should produce same result', (t) => {
    const getValue = (a) => a.value;
    const push = (pattern) => {
        const fn = ({__a}, path) => {
            __a.elements.push(StringLiteral(pattern));
            return path;
        };
        
        return () => ({
            '__putout_processor_ignore(__a)': fn,
        });
    };
    
    const match = (pattern) => {
        const fn = ({__a}) => {
            const list = __a.elements.map(getValue);
            return !list.includes(pattern);
        };
        
        return () => ({
            '__putout_processor_ignore(__a)': fn,
        });
    };
    
    const hello = {
        report: () => '',
        match: match('hello'),
        replace: push('hello'),
    };
    const world = {
        report: () => '',
        match: match('world'),
        replace: push('world'),
    };
    
    const {code} = putout('__putout_processor_ignore([])', {
        runPlugins,
        plugins: [
            ['hello', hello],
            ['world', world],
        ],
    });
    
    const expected = `__putout_processor_ignore(['hello']);`;
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: replace: ts', (t) => {
    const hello = {
        report: () => 'Type "number" should be used instead of "any"',
        replace: () => ({
            'const __a: any = __b': ({__a}, path) => {
                __a.typeAnnotation.typeAnnotation.type = 'TSNumberKeyword';
                return path;
            },
        }),
    };
    
    const {code} = putout('const a: any = 5', {
        runPlugins,
        isTS: true,
        plugins: [
            ['hello', hello],
        ],
    });
    
    const expected = 'const a: number = 5';
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: replace: template identifiers not linked', (t) => {
    const hello = {
        report: () => '',
        replace: () => ({
            'const __a = 5': 'const __b = 7',
        }),
    };
    
    const message = '☝️ Looks like template values not linked: ["__a"] -> ["__b"]';
    
    const [error] = tryCatch(putout, 'const a = 5', {
        runPlugins,
        isTS: true,
        plugins: [
            ['hello', hello],
        ],
    });
    
    t.equal(error.message, message);
    t.end();
});

test('putout: runner: replace: template identifiers: instanceof', (t) => {
    const instance = {
        report: () => '',
        replace: () => ({
            '__a instanceof Array': 'Array.isArray(__a)',
        }),
    };
    
    const {code} = putout('[1, 2] instanceof Array', {
        runPlugins,
        plugins: [
            ['instance', instance],
        ],
    });
    
    const expected = 'Array.isArray([1, 2]);';
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: replace: import', (t) => {
    const instance = {
        report: () => '',
        replace: () => ({
            'import {parse, compare, transform} from "putout"': `{
                import {parse, transform} from 'putout';
                import compare from '@putout/compare';
            }`,
        }),
    };
    
    const source = montag`
        import {parse, compare, transform} from 'putout';
    `;
    
    const {code} = putout(source, {
        runPlugins,
        plugins: [
            ['instance', instance],
            'remove-nested-blocks',
        ],
    });
    
    const expected = montag`
        import {parse, transform} from 'putout';
        import compare from '@putout/compare';
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: replace: empty', (t) => {
    const instance = {
        report: () => '',
        replace: () => ({
            '': '',
        }),
    };
    
    const source = montag`
        import {parse, compare, transform} from 'putout';
    `;
    
    const {code} = putout(source, {
        runPlugins,
        plugins: [
            ['instance', instance],
        ],
    });
    
    t.equal(code, source);
    t.end();
});

test('putout: runner: replace: watermark: when function used', (t) => {
    const source = montag`
        template('hello');
        NumericLiteral(5);
    `;
    
    const {code} = putout(source, {
        runPlugins,
        plugins: [
            'convert-esm-to-commonjs',
            'declare',
            'putout',
        ],
    });
    
    const expected = montag`
       const {
         types: types
       } = require('putout');
       
       const {
         template: template
       } = require('putout');
       
       const {
         NumericLiteral
       } = types;
       
       template('hello');
       NumericLiteral(5);
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: replace: fix: options', (t) => {
    const instance = {
        report: () => '',
        fix: (path, {options}) => path.get('declarations.0').node.init.value = options.value,
        find: (ast, {traverse, push}) => {
            traverse(ast, {
                'const __a = __b'(path) {
                    push(path);
                },
            });
        },
    };
    
    const source = montag`
        const a = 5;
    `;
    
    const {code} = putout(source, {
        runPlugins,
        rules: {
            instance: ['on', {
                value: 3,
            }],
        },
        plugins: [
            ['instance', instance],
        ],
    });
    
    const expected = 'const a = 3;';
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: replace: fix: crawl', (t) => {
    const source = montag`
        test('hello world', (t) => {
            emitter.on('progress', () => {
                t.equal(progress, 100);
                t.end();
            });
        });
    `;
    
    const {code} = putout(source, {
        runPlugins,
        plugins: [
            'tape',
        ],
    });
    
    const expected = montag`
        import {test} from 'supertape';
        
        const {
            once
        } = require('events');
        
        test('hello world', async t => {
            await once(emitter, 'progress');
            t.equal(progress, 100);
            t.end();
        });
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: replace: fix: crawl: block', (t) => {
    const source = readFixture('crawl-block');
    const {code} = putout(source, {
        runPlugins,
        plugins: [
            'convert-commonjs-to-esm',
        ],
    });
    
    const expected = readFixture('crawl-block-fix');
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: replace: return: not path, node and string', (t) => {
    const source = `const hello = 'world'`;
    const [error] = tryCatch(putout, source, {
        plugins: [{
            hello: {
                report: () => 'xxx',
                replace: () => ({
                    'const __a = __b': () => true,
                }),
            },
        }],
    });
    
    const expected = [
        `☝️ Looks like you passed 'replace' value with a wrong type.`,
        `Allowed: 'string', 'node' and 'path'. Received: 'boolean' with value 'true'.`,
    ].join(' ');
    
    t.equal(error.message, expected);
    t.end();
});

test('putout: runner: replace: match not function', (t) => {
    const source = `const hello = 'world'`;
    const [error] = tryCatch(putout, source, {
        plugins: [{
            hello: {
                report: () => 'xxx',
                replace: () => ({
                    'const __a = __b': () => '',
                }),
                match: () => ({
                    'const __a = __b': 'xxx',
                }),
            },
        }],
    });
    
    const expected = `☝️ Looks like 'match' property value is not a 'function', but 'string' with value 'xxx'.`;
    
    t.equal(error.message, expected);
    t.end();
});

test('putout: runner: replace: return nothing', (t) => {
    const addVar = {
        report: () => {},
        replace: () => ({
            Program() {
            },
        }),
    };
    
    const [error] = tryCatch(putout, 'debugger', {
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    t.notOk(error);
    t.end();
});

test('putout: runner: replace: **', (t) => {
    const plugin = {
        report: () => '',
        replace: () => ({
            '__a * __a': '__a ** 2',
            'Math.sqrt(__a ** 2 + __b ** 2)': 'Math.hypot(__a, __b)',
        }),
    };
    
    const {code} = putout('Math.sqrt(1 * 1 + 2 * 2);', {
        runPlugins,
        plugins: [
            ['plugin', plugin],
        ],
    });
    
    const expected = 'Math.hypot(1, 2);';
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: replace: jsx', (t) => {
    const plugin = {
        report: () => '',
        replace: () => ({
            '<h1>__a</h1>': '<h2>__a</h2>',
        }),
    };
    
    const {code} = putout('<h1>hello</h1>', {
        runPlugins,
        plugins: [
            ['plugin', plugin],
        ],
    });
    
    const expected = '<h2>hello</h2>;';
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: replace: jsx: children', (t) => {
    const plugin = {
        report: () => '',
        replace: () => ({
            '<h1 className="y">__jsx_children</h1>': '<h1 class="y">__jsx_children</h1>',
        }),
    };
    
    const {code} = putout('<h1 className="y">hello</h1>', {
        runPlugins,
        plugins: [
            ['plugin', plugin],
        ],
    });
    
    const expected = `<h1 class='y'>hello</h1>;`;
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: replace: jsx: attribute', (t) => {
    const from = montag`
        <Link href="__a">
          <a>__b</a>
        </Link>
    `;
    
    const plugin = {
        report: () => '',
        replace: () => ({
            [from]: ({__b}) => {
                __b.type = 'StringLiteral';
                return __b;
            },
        }),
    };
    
    const source = montag`
        <Link href="/about">
            <a>About</a>
        </Link>
    `;
    
    const {code} = putout(source, {
        runPlugins,
        plugins: [
            ['plugin', plugin],
        ],
    });
    
    const expected = `'About';`;
    
    t.equal(code, expected);
    t.end();
});

test('putout: runner: replace: comments', (t) => {
    const plugin = {
        report: () => '',
        replace: () => ({
            'testFunc (__args)': ({__args}, path) => {
                __args.unshift(__args[1]);
                return path;
            },
        }),
    };
    
    const source = montag`
        testFunc (/** @type {string} */ (a), b);
    `;
    
    const {code} = putout(source, {
        runPlugins,
        plugins: [
            ['plugin', plugin],
        ],
    });
    
    const expected = `testFunc(b, /** @type {string} */ a, b);`;
    
    t.equal(code, expected);
    t.end();
});

