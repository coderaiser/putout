'use strict';

const test = require('supertape');
const {isSimple} = require('./is-simple');

test('operate: is-simple: Identifier', (t) => {
    const result = isSimple({
        type: 'Identifier',
    });
    
    t.ok(result);
    t.end();
});

test('operate: is-simple: MemberExpression', (t) => {
    const result = isSimple({
        type: 'MemberExpression',
    });
    
    t.ok(result);
    t.end();
});

test('operate: is-simple: OptionalMemberExpression', (t) => {
    const result = isSimple({
        type: 'OptionalMemberExpression',
    });
    
    t.ok(result);
    t.end();
});

test('operate: is-simple: CallExpression', (t) => {
    const result = isSimple({
        type: 'CallExpression',
    });
    
    t.notOk(result);
    t.end();
});

test('operate: is-simple: Literal', (t) => {
    const result = isSimple({
        type: 'StringLiteral',
    });
    
    t.ok(result);
    t.end();
});
