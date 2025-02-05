'use strict';

const {test} = require('supertape');
const {
    isKeyword,
    isDeclarationKeyword,
    isConditionKeyword,
    isModuleDeclarationKeyword,
    isStatementKeyword,
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

test('putout: operator: keyword: isModuleDeclarationKeyword', (t) => {
    const result = isModuleDeclarationKeyword('export');
    
    t.ok(result);
    t.end();
});

test('putout: operator: keyword: isModuleDeclarationKeyword: no', (t) => {
    const result = isModuleDeclarationKeyword('let');
    
    t.notOk(result);
    t.end();
});

test('putout: operator: keyword: isConditionKeyword', (t) => {
    const result = isConditionKeyword('if');
    
    t.ok(result);
    t.end();
});

test('putout: operator: keyword: break', (t) => {
    const result = isKeyword('break');
    
    t.ok(result);
    t.end();
});

test('putout: operator: isStatementKeyword: of', (t) => {
    const result = isStatementKeyword('of');
    
    t.ok(result);
    t.end();
});

test('putout: operator: isStatementKeyword: await', (t) => {
    const result = isStatementKeyword('await');
    
    t.notOk(result);
    t.end();
});

test('putout: operator: isStatementKeyword: typeof', (t) => {
    const result = isKeyword('typeof');
    
    t.ok(result);
    t.end();
});

test('putout: operator: isStatementKeyword: interface', (t) => {
    const result = isKeyword('interface');
    
    t.ok(result);
    t.end();
});
