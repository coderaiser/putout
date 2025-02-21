'use strict';

const {join} = require('node:path');
const {readFileSync} = require('node:fs');

const {RuleTester} = require('eslint');
const montag = require('montag');
const babel = require('@babel/eslint-parser/experimental-worker');
const typescript = require('@typescript-eslint/parser');

const rule = require('./index');
const readFixture = (a) => readFileSync(join(__dirname, 'fixture', `${a}.ts`), 'utf8');

const ruleTester = new RuleTester({
    languageOptions: {
        ecmaVersion: 2025,
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
                    'remove-unused-variables': 'off',
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
            message: `'m' is defined but never used (remove-unused-variables)`,
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
            message: 'Useless variable declaration with name "t" (remove-useless-variables/remove)',
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
            column: 7,
            message: `'m' is defined but never used (remove-unused-variables)`,
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
                'remove-unused-variables': 'off',
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
            column: 1,
            message: `'A' is defined but never used (remove-unused-variables)`,
        }, {
            line: 2,
            column: 8,
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
            import {createMockImport} from 'mock-import';
            const {mockImport, reImport} = createMockImport(import.meta.url);
            
            mockImport('hello', world);
            await reImport('./index.js');
        `,
    }],
    invalid: [{
        options: [{
            rules: {
                tape: 'on',
            },
        }],
        code: montag`
            import {createMockImport} from 'mock-import';
            const {mockImport} = createMockImport(import.meta.url);
            
            mockImport('tape', check);
            await reImport('./index.js');
        `,
        output: montag`
            import {createMockImport} from 'mock-import';
            
            const {mockImport, reImport} = createMockImport(import.meta.url);
            
            mockImport('tape', check);
            await reImport('./index.js');\n
        `,
        errors: [{
            line: 5,
            column: 7,
            message: `Declare 'reImport', it referenced but not defined (tape/declare)`,
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
            message: `Remove useless variable 'path' (remove-useless-variables/destruct)`,
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
            import {createMockImport} from 'mock-import';
            const {mockImport, reImport} = createMockImport(import.meta.url);
            
            mockImport('hello', world);
            await reImport('./index.js');
    `,
    }],
    invalid: [{
        options: [{
            rules: {
                tape: 'on',
            },
        }],
        code: montag`
            import {createMockImport} from 'mock-import';
            const {mockImport} = createMockImport(import.meta.url);
            
            mockImport('hello', world);
            await reImport('./index.js');
        `,
        output: montag`
            import {createMockImport} from 'mock-import';
            
            const {mockImport, reImport} = createMockImport(import.meta.url);
            
            mockImport('hello', world);
            await reImport('./index.js');\n
        `,
        errors: [{
            line: 5,
            column: 7,
            message: `Declare 'reImport', it referenced but not defined (tape/declare)`,
        }],
    }, {
        code: `a = is() ? a : b`,
        options: [{
            rules: {
                'convert-assignment-to-declaration': 'off',
            },
        }],
        output: montag`
            if (!is())
                a = b;\n
        `,
        errors: [{
            line: 1,
            column: 1,
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
            column: 9,
            message: 'Avoid useless conditions (conditions/evaluate)',
        }],
    }, {
        code: readFixture('typescript-eslint-parent'),
        output: readFixture('typescript-eslint-parent-fix'),
        options: [{
            rules: {
                'remove-unused-variables': 'off',
                'typescript/remove-unused-types': 'off',
                'typescript/remove-duplicates-from-union': 'on',
            },
        }],
        errors: [{
            line: 5,
            column: 5,
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
            message: `Identifier 'Stub' has already been declared. (3:20) (putout)`,
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
            message: `'m' is defined but never used (remove-unused-variables)`,
        }],
    }],
});
