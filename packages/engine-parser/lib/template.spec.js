'use strict';

const tryCatch = require('try-catch');

const test = require('supertape');
const {
    Identifier,
    StringLiteral,
} = require('@babel/types');

const template = require('./template');

test('parser: template', (t) => {
    const buildOnce = template(`await once(%%emitter%%, %%event%%)`);
    const result = buildOnce({
        emitter: Identifier('copymitter'),
        event: StringLiteral('end'),
    });
    
    t.equal(result.type, 'ExpressionStatement');
    t.end();
});

test('parser: template: expression', (t) => {
    const buildRequire = template(`
      var %%importName%% = require(%%source%%);
    `);
    
    const ast = buildRequire({
        importName: Identifier('myModule'),
        source: StringLiteral('my-module'),
    });
    
    t.notOk(ast.expression);
    t.end();
});

test('parser: template: ast: fresh', (t) => {
    const one = template.ast.fresh('const hello = "world"');
    one.x = 'zzz';
    
    const two = template.ast.fresh('const hello = "world"');
    
    t.notOk(two.x);
    t.end();
});

test('parser: template: ast', (t) => {
    const one = template.ast('const hello = "world"');
    one.x = 'zzz';
    
    const two = template.ast('const hello = "world"');
    
    t.ok(two.x);
    t.end();
});

test('parser: template: import in block', (t) => {
    const [error] = tryCatch(template.ast, `
    {
        import compare from '@putout/compare';
    }
    `);
    
    t.notOk(error);
    t.end();
});

test('parser: template: program: ast', (t) => {
    const one = template.program.ast('const hello = "world"');
    one.x = 'zzz';
    
    const two = template.program.ast('const hello = "world"');
    
    t.ok(two.x);
    t.end();
});

test('parser: template: program: ast: type', (t) => {
    const node = template.program.ast('const hello = "world"');
    
    t.equal(node.type, 'Program');
    t.end();
});

test('parser: template: ast: ts', (t) => {
    const node = template.program.ast('const hello: any = "world"');
    
    t.equal(node.type, 'Program');
    t.end();
});

test('parser: template: program', (t) => {
    const buildRequire = template.program(`
      var %%importName%% = require(%%source%%);
    `);
    
    const ast = buildRequire({
        importName: Identifier('myModule'),
        source: StringLiteral('my-module'),
    });
    
    t.equal(ast.type, 'Program');
    t.end();
});
