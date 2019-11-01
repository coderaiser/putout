'use strict';

const test = require('supertape');
const template = require('./template');

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

