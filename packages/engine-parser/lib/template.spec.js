'use strict';

const tryCatch = require('try-catch');
const test = require('supertape');
const {types} = require('@putout/babel');
const template = require('./template');

const {identifier, stringLiteral} = types;

test('parser: template', (t) => {
    const buildOnce = template(`await once(%%emitter%%, %%event%%)`);
    
    const result = buildOnce({
        emitter: identifier('copymitter'),
        event: stringLiteral('end'),
    });
    
    t.equal(result.type, 'AwaitExpression');
    t.end();
});

test('parser: template: statement', (t) => {
    const buildRequire = template(`
      var %%importName%% = require(%%source%%);
    `);
    
    const ast = buildRequire({
        importName: identifier('myModule'),
        source: stringLiteral('my-module'),
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

test('parser: template: ast: jsx', (t) => {
    const [error] = tryCatch(template.ast, '<h1>hello</h1>');
    
    t.notOk(error);
    t.end();
});

test('parser: template: TSExportAssignment', (t) => {
    const {type} = template.ast('export = a');
    
    t.equal(type, 'TSExportAssignment');
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
        importName: identifier('myModule'),
        source: stringLiteral('my-module'),
    });
    
    t.equal(ast.type, 'Program');
    t.end();
});

test('parser: template: expression', (t) => {
    const buildArrow = template('() => %%x%%');
    
    const ast = buildArrow({
        x: stringLiteral('my-module'),
    });
    
    t.equal(ast.type, 'ArrowFunctionExpression');
    t.end();
});

test('parser: template: extractExpression', (t) => {
    const expression = {
        type: 'AssignmentExpression',
    };
    
    const result = template.extractExpression({
        type: 'ExpressionStatement',
        expression,
    });
    
    t.equal(result, expression);
    t.end();
});

test('parser: template: extractExpression: TSExternalModuleReference', (t) => {
    const expression = {
        type: 'StringLiteral',
    };
    
    const result = template.extractExpression({
        type: 'TSExternalModuleReference',
        expression,
    });
    
    t.equal(result, expression);
    t.end();
});
