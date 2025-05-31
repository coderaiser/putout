'use strict';

const montag = require('montag');
const test = require('supertape');
const putout = require('putout');
const tryCatch = require('try-catch');

const {
    parse,
    generate,
    print,
} = require('..');

const {readFixtures} = require('./fixture');
const {traverse} = putout;

const fixture = readFixtures([
    'export-default-declaration',
    'export-default-declaration-fix',
    'debugger',
    'debugger-fix',
    'decorator',
    'decorator-legacy',
    'decorator-auto-accessors',
    'destructuring-private',
    'directive-comment',
    'duplicate',
    'throw',
    'flow',
    'flow-fix',
    'no-flow',
    'flow-fix',
    'typescript',
    'typescript-fix',
    'jsx-template',
    'jsx-template-fix',
    'jsx-not-react',
    'printer-babel',
    'printer-babel-fix',
    'strict-mode',
    'strict-mode-fix',
    'parens-typescript',
    'parens-typescript-fix',
]);

test('putout: parser: export default declaration: acorn', (t) => {
    const {code} = putout(fixture.exportDefaultDeclaration, {
        parser: 'acorn',
        plugins: ['remove-unused-variables'],
    });
    
    const expected = fixture.exportDefaultDeclarationFix;
    
    t.deepEqual(code, expected);
    t.end();
});

test('putout: parser: acorn: parens-typescript', (t) => {
    const {code} = putout(fixture.parensTypescript, {
        parser: 'acorn',
        plugins: ['remove-unused-variables'],
    });
    
    const expected = fixture.parensTypescriptFix;
    
    t.deepEqual(code, expected);
    t.end();
});

test('putout: parser: export default declaration: esprima', (t) => {
    const {code} = putout(fixture.exportDefaultDeclaration, {
        parser: 'esprima',
        plugins: ['remove-unused-variables'],
    });
    
    const expected = fixture.exportDefaultDeclarationFix;
    
    t.deepEqual(code, expected);
    t.end();
});

test('putout: parser: export default declaration: custom parser', (t) => {
    const [e] = tryCatch(putout, fixture.exportDefaultDeclaration, {
        parser: 'custom',
        plugins: ['remove-unused-variables'],
    });
    
    t.match(e.message, `Cannot find module 'custom'`);
    t.end();
});

test('putout: parser: use strict: parser: espree: debugger', (t) => {
    const {code} = putout(fixture.debugger, {
        parser: 'espree',
        fixCount: 1,
        plugins: ['remove-debugger'],
    });
    
    const expected = fixture.debuggerFix;
    
    t.deepEqual(code, expected);
    t.end();
});

test('putout: parser: export default declaration: tenko: export default', (t) => {
    const {code} = putout(fixture.exportDefaultDeclaration, {
        parser: 'tenko',
        plugins: ['remove-unused-variables'],
    });
    
    const expected = fixture.exportDefaultDeclarationFix;
    
    t.deepEqual(code, expected);
    t.end();
});

test('putout: parser: export default declaration: tenko: throw', (t) => {
    const {code} = putout(fixture.throw, {
        plugins: ['remove-unused-variables'],
    });
    
    const expected = '\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: parser: babel: optional chaining', (t) => {
    const apply = {
        report: () => '',
        replace: () => ({
            '__a && __a.__b': '__a?.__b',
        }),
    };
    
    const {code} = putout('hello && hello.world', {
        plugins: [
            ['apply', apply],
        ],
    });
    
    const expected = 'hello?.world;\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: parser: babel: nullish coalescing operator', (t) => {
    const apply = {
        report: () => '',
        replace: () => ({
            'const __a = __b || __c': 'const __a = __b ?? __c',
        }),
    };
    
    const {code} = putout('const hello = world || "world"', {
        plugins: [
            ['apply', apply],
        ],
    });
    
    const expected = `const hello = world ?? 'world';\n`;
    
    t.equal(code, expected);
    t.end();
});

test('putout: parser: generate', (t) => {
    const node = parse('a = b');
    const {code} = generate(node);
    const expected = 'a = b;';
    
    t.equal(code, expected);
    t.end();
});

test('putout: parser: flow', (t) => {
    const {code} = putout(fixture.flow, {
        plugins: ['remove-unused-variables'],
    });
    
    const expected = fixture.flowFix;
    
    t.equal(code, expected);
    t.end();
});

test('putout: parser: no-flow', (t) => {
    const [error] = tryCatch(putout, fixture.noFlow);
    
    t.ok(error, 'should not parse flow when not at the beginning');
    t.end();
});

test('putout: parser: broken', (t) => {
    const [error] = tryCatch(putout, 'console.lo(');
    
    t.equal(error.reason, 'parse');
    t.end();
});

test('putout: parser: typescript', (t) => {
    const {code} = putout(fixture.typescript, {
        isTS: true,
        plugins: ['remove-unused-variables'],
    });
    
    const expected = fixture.typescriptFix;
    
    t.equal(code, expected);
    t.end();
});

test('putout: parser: decorator', (t) => {
    const {code} = putout(fixture.decorator, {
        isTS: true,
        plugins: ['remove-unused-variables'],
    });
    
    const expected = fixture.decorator;
    
    t.equal(code, expected);
    t.end();
});

test('putout: parser: decorator-legacy', (t) => {
    const {code} = putout(fixture.decoratorLegacy, {
        isTS: true,
        plugins: ['remove-unused-variables'],
    });
    
    const expected = fixture.decoratorLegacy;
    
    t.equal(code, expected);
    t.end();
});

test('putout: parser: jsx', (t) => {
    const source = fixture.jsxTemplate;
    const babel = require('../lib/parsers/babel');
    const node = babel.parse(source, {
        isJSX: true,
        printer: 'babel',
    });
    
    const code = print(node, {
        printer: 'babel',
        source,
    });
    
    const expected = fixture.jsxTemplateFix;
    
    t.equal(`${code}\n`, expected);
    t.end();
});

test('putout: parser: jsx: not react', (t) => {
    const [error] = tryCatch(parse, fixture.jsxNotReact);
    
    t.notOk(error);
    t.end();
});

test('putout: parser: strict mode', (t) => {
    const {code} = putout(fixture.strictMode, {
        plugins: ['remove-unused-variables'],
    });
    
    t.equal(code, fixture.strictModeFix);
    t.end();
});

test('putout: parser: duplicate', (t) => {
    const [error] = tryCatch(parse, fixture.duplicate);
    
    t.equal(error.message, `Identifier 'x' has already been declared. (1:11)`);
    t.end();
});

test('putout: parser: undeclared exports', (t) => {
    const [error] = tryCatch(parse, 'export {x}');
    
    t.notOk(error);
    t.end();
});

test('putout: parser: parse: fresh', (t) => {
    const ast = parse('var a');
    
    ast.x = 1;
    
    const result = parse('var a');
    
    t.notOk(result.x);
    t.end();
});

test('putout: print: recast: object expressions', (t) => {
    const ast = parse(`(a, b) => ({a: 'b'})`, {
        printer: 'recast',
    });
    
    traverse(ast, {
        Function(path) {
            path.get('params.0').remove();
        },
    });
    
    const result = print(ast);
    
    const expected = montag`
        (b) => ({
            a: 'b',
        });\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('putout: parser: json modules: with', (t) => {
    const code = `
        import json from "./foo.json" with { type: "json" };
    `;
    
    const [error] = tryCatch(parse, code);
    
    t.notOk(error);
    t.end();
});

test('putout: parser: json modules: assert', (t) => {
    const code = `
        import json from "./foo.json" assert { type: "json" };
    `;
    
    const [error] = tryCatch(parse, code);
    
    t.notOk(error);
    t.end();
});

test('putout: parser: Literal: node.raw', (t) => {
    const {code} = putout('10000', {
        plugins: [
            ['math'],
        ],
    });
    
    const expected = '10_000;\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: parser: printer: putout', (t) => {
    const {code} = putout('10000', {
        printer: 'putout',
        plugins: [
            ['math'],
        ],
    });
    
    const expected = '10_000;\n';
    
    t.equal(code, expected);
    t.end();
});

test('putout: parser: typescrip with jsx: ambiguity syntax', (t) => {
    const source = `
        const boundaryElement = <HTMLElement1>e.target;
   `;
    
    const [error] = tryCatch(putout, source, {
        isTS: true,
    });
    
    t.notOk(error, 'should give second chance');
    t.end();
});

test('putout: parser: babel: destructuring private', (t) => {
    const source = fixture.destructuringPrivate;
    const [error] = tryCatch(putout, source);
    
    t.notOk(error, 'should parse destructuring private');
    t.end();
});

test('putout: parser: babel/options', (t) => {
    const result = require('@putout/engine-parser/babel/options');
    const expected = require('../lib/parsers/babel/options');
    
    t.equal(result, expected);
    t.end();
});

test('putout: parser: babel/plugins', (t) => {
    const result = require('@putout/engine-parser/babel/plugins');
    const expected = require('../lib/parsers/babel/plugins');
    
    t.equal(result, expected);
    t.end();
});

test('putout: parser: babel', (t) => {
    const result = require('@putout/engine-parser/babel');
    const expected = require('../lib/parsers/babel');
    
    t.equal(result, expected);
    t.end();
});

test('putout: parser: acorn', (t) => {
    const result = require('@putout/engine-parser/acorn');
    const expected = require('../lib/parsers/acorn');
    
    t.equal(result, expected);
    t.end();
});

test('putout: parser: espree', (t) => {
    const result = require('@putout/engine-parser/espree');
    const expected = require('../lib/parsers/espree');
    
    t.equal(result, expected);
    t.end();
});

test('putout: parser: esprima', (t) => {
    const result = require('@putout/engine-parser/esprima');
    const expected = require('../lib/parsers/esprima');
    
    t.equal(result, expected);
    t.end();
});

test('putout: parser: printer: babel', (t) => {
    const {code} = putout(fixture.printerBabel, {
        printer: 'babel',
        plugins: ['remove-unused-variables'],
    });
    
    const expected = fixture.printerBabelFix;
    
    t.equal(code, expected);
    t.end();
});

test('putout: parser: recast: directive: comment', (t) => {
    const {code} = putout(fixture.directiveComment);
    const expected = fixture.directiveComment;
    
    t.equal(code, expected);
    t.end();
});

test('putout: parser: putout: directive: comment', (t) => {
    const {code} = putout(fixture.directiveComment, {
        printer: 'putout',
    });
    
    const expected = fixture.directiveComment;
    
    t.equal(code, expected);
    t.end();
});

test('putout: parser: putout: decoratorAutoAccessors', (t) => {
    const {code} = putout(fixture.decoratorAutoAccessors, {
        printer: 'putout',
    });
    
    t.equal(code, fixture.decoratorAutoAccessors);
    t.end();
});
