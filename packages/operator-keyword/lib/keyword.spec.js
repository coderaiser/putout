'use strict';

const {test} = require('supertape');
const {
    isKeyword,
    isDeclarationKeyword,
    isConditionKeyword,
} = require('./keyword');

test('putout: operator: keyword: isKeyword: yes', (t) => {
    const result = isKeyword('if');
    
    t.ok(result);
    t.end();
});

test('putout: operator: keyword: isKeyword: no', (t) => {
    const result = isKeyword('abc');
    
    t.notOk(result);
    t.end();
});

test('putout: operator: keyword: isDeclarationKeyword', (t) => {
    const result = isDeclarationKeyword('let');
    
    t.ok(result);
    t.end();
});

test('putout: operator: keyword: isConditionKeyword', (t) => {
    const result = isConditionKeyword('if');
    
    t.ok(result);
    t.end();
});
