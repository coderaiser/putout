'use strict';

const {test} = require('supertape');
const {
    isKeyword,
    isTSKeyword,
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

test('putout: operator: isKeyword: typeof', (t) => {
    const result = isKeyword('typeof');
    
    t.ok(result);
    t.end();
});

test('putout: operator: isKeyword: interface', (t) => {
    const result = isKeyword('interface');
    
    t.ok(result);
    t.end();
});

test('putout: operator: isKeyword: readonly: no', (t) => {
    const result = isKeyword('readonly');
    
    t.notOk(result);
    t.end();
});

test('putout: operator: isTSKeyword: readonly', (t) => {
    const result = isTSKeyword('readonly');
    
    t.ok(result);
    t.end();
});

test('putout: operator: isKeyword: static', (t) => {
    const result = isKeyword('static');
    
    t.ok(result);
    t.end();
});

test('putout: operator: isTSKeyword: static', (t) => {
    const result = isTSKeyword('static');
    
    t.ok(result);
    t.end();
});

test('putout: operator: isKeyword: implements: no', (t) => {
    const result = isKeyword('implements');
    
    t.notOk(result);
    t.end();
});

test('putout: operator: isTSKeyword: implements', (t) => {
    const result = isTSKeyword('implements');
    
    t.ok(result);
    t.end();
});

test('putout: operator: isTSKeyword: declare', (t) => {
    const result = isTSKeyword('declare');
    
    t.ok(result);
    t.end();
});

test('putout: operator: isTSKeyword: module', (t) => {
    const result = isTSKeyword('module');
    
    t.ok(result);
    t.end();
});

test('putout: operator: isTSKeyword: type', (t) => {
    const result = isTSKeyword('type');
    
    t.ok(result);
    t.end();
});

test('putout: operator: isKeyword: class', (t) => {
    const result = isKeyword('class');
    
    t.ok(result);
    t.end();
});

test('putout: operator: isKeyword: extends', (t) => {
    const result = isKeyword('extends');
    
    t.ok(result);
    t.end();
});

test('putout: operator: isKeyword: module: no', (t) => {
    const result = isKeyword('module');
    
    t.notOk(result);
    t.end();
});

test('putout: operator: isKeyword: async', (t) => {
    const result = isKeyword('async');
    
    t.ok(result);
    t.end();
});

test('putout: operator: isKeyword: default', (t) => {
    const result = isKeyword('default');
    
    t.ok(result);
    t.end();
});

test('putout: operator: isKeyword: assert', (t) => {
    const result = isKeyword('assert');
    
    t.ok(result);
    t.end();
});

test('putout: operator: isKeyword: with', (t) => {
    const result = isKeyword('with');
    
    t.ok(result);
    t.end();
});

test('putout: operator: isKeyword: debugger', (t) => {
    const result = isKeyword('debugger');
    
    t.ok(result);
    t.end();
});
