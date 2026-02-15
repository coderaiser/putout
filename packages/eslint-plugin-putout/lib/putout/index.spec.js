import {join, dirname} from 'node:path';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {RuleTester} from 'eslint';
import montag from 'montag';
import babel from '@babel/eslint-parser';
import typescript from '#typescript-eslint/parser';
import rule from './index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const readFixture = (a) => readFileSync(join(__dirname, 'fixture', `${a}.ts`), 'utf8');

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2026,
    },
});

ruleTester.run('putout', rule, {
    valid: [
        `const bar = foo?.bar; log(bar)`,
        `
        function foo({ bar }) {
          return { bar };
        }
        
        foo({ bar: 123 });`,
        'fn(/(?<foo>a)/)', {
            options: [{
                rules: {
                    'variables/remove-unused': 'off',
                },
            }],
            code: `const t = 'hi';`,
        }, {
            options: [{
                ignore: ['<input>'],
            }],
            code: `const t = 'hi';`,
        }],
    invalid: [{
        code: `const m = 'hi'`,
        output: '\n',
        errors: [{
            message: `'m' is defined but never used (variables/remove-unused)`,
        }],
    }, {
        code: `const t = 'hi'; module.exports = t`,
        options: [{
            rules: {
                'nodejs/add-missing-strict-mode': 'on',
            },
        }],
        output: `'use strict';\n\nmodule.exports = 'hi';\n`,
        errors: [{
            message: `Add missing 'use strict' directive on top of CommonJS (nodejs/add-missing-strict-mode)`,
        }, {
            message: `Avoid useless variable declaration with name 't' (variables/remove-useless)`,
        }],
    }, {
        options: [{
            rules: {
                'nodejs/add-missing-strict-mode': 'off',
            },
        }],
        code: montag`
            // hello
            const m = 'hi';
            const t = 'world';
            log(t);
        `,
        output: montag`
            // hello
            const t = 'world';
            log(t);\n
        `,
        errors: [{
            line: 2,
            column: 8,
            message: `'m' is defined but never used (variables/remove-unused)`,
        }],
    }],
});

const parserTester = new RuleTester({
    languageOptions: {
        parser: babel,
        parserOptions: {
            requireConfigFile: false,
            babelOptions: {
                plugins: ['@babel/plugin-syntax-typescript'],
            },
        },
    },
});

const tsParserTester = new RuleTester({
    languageOptions: {
        parser: typescript,
        parserOptions: {
            warnOnUnsupportedTypeScriptVersion: false,
        },
    },
});

parserTester.run('putout: typescript', rule, {
    valid: [{
        options: [{
            rules: {
                'variables/remove-unused': 'off',
            },
        }],
        code: `
            const x: X[] = [];
        `,
    }],
    invalid: [{
        options: [{
            rules: {
                'typescript/convert-generic-to-shorthand': 'on',
            },
        }],
        code: montag`
            interface A {
                x: Array<X>;
            }
        `,
        output: '\n',
        errors: [{
            line: 1,
            column: 2,
            message: `'A' is defined but never used (variables/remove-unused)`,
        }, {
            line: 2,
            column: 9,
            message: `Use shorthand '[]' instead of generic 'Array' (typescript/convert-generic-to-shorthand)`,
        }],
    }],
});

parserTester.run('putout: tape', rule, {
    valid: [{
        options: [{
            rules: {
                tape: 'on',
            },
        }],
        code: `
            import {test} from 'supertape';
            
            test('hello: world', (t) => {
                t.end();
            });
        `,
    }],
    invalid: [{
        options: [{
            rules: {
                tape: 'on',
            },
        }],
        code: montag`
            test('hello: world', (t) => {
                t.end();
            });
        `,
        output: montag`
            import {test} from 'supertape';
            
            test('hello: world', (t) => {
                t.end();
            });\n
        `,
        errors: [{
            line: 1,
            column: 2,
            message: `Declare 'test', it referenced but not defined (tape/declare)`,
        }],
    }, {
        code: montag`
            parse1({
                exit(path) {
                    const {node} = path;
                    
                    convertNodeComments(node);
                }
            });
        `,
        output: montag`
            parse1({
                exit({node}) {
                    convertNodeComments(node);
                },
            });\n
        `,
        errors: [{
            message: `Avoid useless variable 'path' (destructuring/remove-useless-variables)`,
        }],
    }],
});

parserTester.run('putout', rule, {
    valid: [{
        options: [{
            rules: {
                tape: 'on',
            },
        }],
        code: `
            import {test} from 'supertape';
            
            test('hello: world', (t) => {
                t.end();
            });
    `,
    }],
    invalid: [{
        options: [{
            rules: {
                tape: 'on',
            },
        }],
        code: montag`
            test('hello: world', (t) => {
                t.end();
            });
        `,
        output: montag`
            import {test} from 'supertape';
            
            test('hello: world', (t) => {
                t.end();
            });\n
        `,
        errors: [{
            line: 1,
            column: 2,
            message: `Declare 'test', it referenced but not defined (tape/declare)`,
        }],
    }, {
        code: `a = is() ? a : b`,
        options: [{
            rules: {
                'assignment/convert-to-declaration': 'off',
            },
        }],
        output: montag`
            if (!is())
                a = b;\n
        `,
        errors: [{
            line: 1,
            column: 2,
            message: `Simplify ternary (simplify-ternary/value)`,
        }],
    }],
});

tsParserTester.run('typescript-eslint: comments', rule, {
    valid: [`
        // valid case
        const noop = () => {};
        noop();
    `],
    invalid: [{
        code: readFixture('typescript-eslint-comments'),
        output: readFixture('typescript-eslint-comments-fix'),
        errors: [{
            line: 13,
            column: 10,
            message: 'Avoid useless conditions (conditions/evaluate)',
        }],
    }, {
        code: readFixture('typescript-eslint-parent'),
        output: readFixture('typescript-eslint-parent-fix'),
        options: [{
            rules: {
                'variables/remove-unused': 'off',
                'typescript/remove-unused-types': 'off',
                'typescript/remove-duplicates-from-union': 'on',
            },
        }],
        errors: [{
            line: 5,
            column: 6,
            message: 'Avoid using duplicates in Union (typescript/remove-duplicates-from-union)',
        }],
    }],
});

tsParserTester.run('typescript-eslint-parser-error', rule, {
    valid: [`
        import {Stub} from 'supertape';
        const a: Stub = {};
        
        alert(a);
    `],
    invalid: [{
        code: `
            import {Stub} from 'supertape';
            import {Stub} from 'supertape';
            
            const a: Stub = {};
            
            alert(a);
        `,
        errors: [{
            message: `Identifier 'Stub' has already been declared. (3:20) (parser)`,
            line: 2,
            column: 13,
        }],
    }],
});

tsParserTester.run('typescript-eslint-parser-error', rule, {
    valid: [`
        import {Stub} from 'supertape';
        const a: Stub = {};
        
        alert(a);
    `],
    invalid: [{
        code: 'const a = 5',
        output: null,
        options: [{
            plugins: [
                ['throw', {}],
            ],
        }],
        errors: [{
            message: `☝️ Cannot determine type of plugin 'throw'. Here is list of supported plugins: https://git.io/JqcMn (putout)`,
        }],
    }],
});

ruleTester.run('putout: declare-before-reference: no loc', rule, {
    valid: [`
        const hello = () => 'world'
        hello()
    `],
    invalid: [{
        code: montag`
            hello()
            const hello = () => 'world'
        `,
        output: montag`
            const hello = () => 'world';
            hello();\n
        `,
        errors: [{
            message: `Declare 'hello' before referencing to avoid 'ReferenceError' (declare-before-reference)`,
        }],
    }],
});

ruleTester.run('putout: async', rule, {
    valid: [`
        const hello = () => 'world'
        hello()
    `],
    invalid: [{
        options: [{
            esm: true,
        }],
        code: montag`
            hello()
            const hello = () => 'world'
        `,
        output: montag`
            const hello = () => 'world';
            hello();\n
        `,
        errors: [{
            message: `Declare 'hello' before referencing to avoid 'ReferenceError' (declare-before-reference)`,
        }],
    }],
});

tsParserTester.run('putout: async: typescript-eslint-parser-error', rule, {
    valid: [`
        import {Stub} from 'supertape';
        const a: Stub = {};
        
        alert(a);
    `],
    invalid: [{
        options: [{
            esm: true,
        }],
        code: `
            import {Stub} from 'supertape';
            import {Stub} from 'supertape';
            
            const a: Stub = {};
            
            alert(a);
        `,
        errors: [{
            message: `Identifier 'Stub' has already been declared. (3:20) (parser)`,
            line: 2,
            column: 13,
        }],
    }],
});

tsParserTester.run('putout: async: typescript-eslint-parser-error', rule, {
    valid: [`
        import {Stub} from 'supertape';
        const a: Stub = {};
        
        alert(a);
    `],
    invalid: [{
        code: 'const a = 5',
        output: null,
        options: [{
            esm: true,
            plugins: [
                ['throw', {}],
            ],
        }],
        errors: [{
            message: `☝️ Cannot determine type of plugin 'throw'. Here is list of supported plugins: https://git.io/JqcMn (putout)`,
        }],
    }],
});

ruleTester.run('putout: async: ignore', rule, {
    valid: [`const bar = foo?.bar; log(bar);`, {
        options: [{
            esm: true,
            ignore: ['<input>'],
        }],
        code: `const t = 'hi';`,
    }],
    invalid: [{
        code: `const m = 'hi'`,
        output: '\n',
        errors: [{
            message: `'m' is defined but never used (variables/remove-unused)`,
        }],
    }],
});
