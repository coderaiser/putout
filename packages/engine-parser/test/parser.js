'use strict';

const test = require('supertape');
const putout = require('putout');
const tryCatch = require('try-catch');

const {
    parse,
    generate,
    print,
} = require('..');
const {readFixtures} = require('./fixture');

const fixture = readFixtures([
    'export-default-declaration',
    'export-default-declaration-fix',
    'debugger',
    'debugger-fix',
    'decorator',
    'duplicate',
    'throw',
    'flow',
    'flow-fix',
    'typescript',
    'typescript-fix',
    'jsx-template',
    'jsx-template-fix',
    'record',
    'strict-mode',
    'strict-mode-fix',
]);

test('putout: parser: export default declaration: acorn', (t) => {
    const {code} = putout(fixture.exportDefaultDeclaration, {
        parser: 'acorn',
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = fixture.exportDefaultDeclarationFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: parser: export default declaration: esprima', (t) => {
    const {code} = putout(fixture.exportDefaultDeclaration, {
        parser: 'esprima',
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = fixture.exportDefaultDeclarationFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: parser: export default declaration: custom parser', (t) => {
    const [e] = tryCatch(putout, fixture.exportDefaultDeclaration, {
        parser: 'custom',
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = `Cannot find module 'custom'`;
    t.ok(e.message.includes(expected), 'should equal');
    t.end();
});

test('putout: parser: use strict: parser: espree: debugger', (t) => {
    const {code} = putout(fixture.debugger, {
        parser: 'espree',
        fixCount: 1,
        plugins: [
            'remove-debugger',
        ],
    });
    
    const expected = fixture.debuggerFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: parser: export default declaration: tenko', (t) => {
    const {code} = putout(fixture.exportDefaultDeclaration, {
        parser: 'tenko',
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = fixture.exportDefaultDeclarationFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: parser: export default declaration: tenko', (t) => {
    const {code} = putout(fixture.throw, {
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = '\n';
    
    t.equal(code, expected, 'should equal');
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
    
    const expected = 'hello?.world;';
    
    t.deepEqual(code, expected);
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
    
    const expected = 'const hello = world ?? "world";';
    
    t.deepEqual(code, expected);
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
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = fixture.flowFix;
    
    t.equal(code, expected);
    t.end();
});

test('putout: parser: typescript', (t) => {
    const {code} = putout(fixture.typescript, {
        isTS: true,
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = fixture.typescriptFix;
    
    t.equal(code, expected);
    t.end();
});

test('putout: parser: decorator', (t) => {
    const {code} = putout(fixture.decorator, {
        isTS: true,
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = fixture.decorator;
    
    t.equal(code, expected);
    t.end();
});

test('putout: parser: jsx: enabled', (t) => {
    const babel = require('../lib/parsers/babel');
    
    const node = babel.parse(fixture.jsxTemplate);
    const {code} = generate(node);
    const expected = fixture.jsxTemplateFix;
    
    t.equal(`${code}\n`, expected);
    t.end();
});

test('putout: parser: record', (t) => {
    const node = parse(fixture.record);
    const {code} = generate(node);
    const expected = fixture.record;
    
    t.equal(`${code}\n`, expected);
    t.end();
});

test('putout: parser: record: print', (t) => {
    const node = parse(fixture.record);
    const code = print(node);
    const expected = fixture.record;
    
    t.equal(code, expected);
    t.end();
});

test('putout: parser: strict mode', (t) => {
    const {code} = putout(fixture.strictMode, {
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    t.equal(code, fixture.strictModeFix);
    t.end();
});

test('putout: parser: duplicate', (t) => {
    const [error] = tryCatch(parse, fixture.duplicate);
    
    t.equal(error.message, `Identifier 'x' has already been declared (1:11)`);
    t.end();
});

test('putout: parser: undeclared exports', (t) => {
    const [error] = tryCatch(parse, 'export {x}');
    
    t.notOk(error);
    t.end();
});

