'use strict';

const test = require('supertape');
const template = require('./template');
const {
    Identifier,
    StringLiteral,
} = require('@babel/types');

test('parser: template: ast: fresh', (t) => {
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

