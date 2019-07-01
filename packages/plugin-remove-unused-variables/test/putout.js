'use strict';

const test = require('supertape');

const _putout = require('putout');
const {readFixtures} = require('./fixture');

const removeUnusedVariables = require('..');

const putout = (code) => {
    return _putout(code, {
        plugins: [{
            'remove-unused-variables': removeUnusedVariables,
        }],
    });
};

const fixture = readFixtures([
    'array-pattern',
    'array-pattern-fix',
    'assignment-pattern',
    'assignment-pattern-fix',
    'arrow-function-expression',
    'arrow-function-expression-fix',
    'arrow-vars',
    'no-vars',
    'root-vars',
    'fn-vars',
    'fn-vars-fix',
    'fn-args-vars',
    'fn-args-vars-fix',
    'fn-call',
    'fn-call-vars',
    'fn-call-vars-fix',
    'fn-destr-args-vars',
    'function-declaration',
    'function-declaration-fix',
    'for-of-statement',
    'for-of-statement-fix',
    'destr-vars',
    'destr-vars-fix',
    'destr-nested-vars',
    'import',
    'import-fix',
    'return-statement',
    'variable-declarator',
    'variable-declarator-fix',
]);

test('remove-unused-variables: putout: no vars', (t) => {
    const result = putout(fixture.noVars);
    const expected = {
        code: '',
        places: [],
    };
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: putout: root vars', (t) => {
    const {code} = putout(fixture.rootVars);
    const expected = '\n';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: putout: array pattern', (t) => {
    const {code} = putout(fixture.arrayPattern);
    const expected = fixture.arrayPatternFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: putout: assignment pattern', (t) => {
    const {code} = putout(fixture.assignmentPattern);
    const expected = fixture.assignmentPatternFix;
    
    t.deepEqual(expected, code, 'should equal');
    t.end();
});

test('remove-unused-variables: putout: arrow vars', (t) => {
    const {code} = putout(fixture.arrowVars);
    const expected = '\n\n';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: putout: destr vars', (t) => {
    const {code} = putout(fixture.destrVars);
    const expected = fixture.destrVarsFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: putout: destr nested vars', (t) => {
    const {code} = putout(fixture.destrNestedVars);
    const expected = '\n\n';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: putout: fn vars', (t) => {
    const {code} = putout(fixture.fnVars);
    const expected = fixture.fnVarsFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: putout: fn call', (t) => {
    const {code} = putout(fixture.fnCall);
    const expected = fixture.fnCall;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: putout: fn call vars', (t) => {
    const {code} = putout(fixture.fnCallVars);
    const expected = fixture.fnCallVarsFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: putout: fn args vars', (t) => {
    const {code} = putout(fixture.fnArgsVars);
    const expected = fixture.fnArgsVarsFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: putout: fn destr args vars', (t) => {
    const {code} = putout(fixture.fnDestrArgsVars);
    const expected = '\n';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: putout: return statement', (t) => {
    const {code} = putout(fixture.returnStatement);
    const expected = '\n\n';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: putout: for of statement', (t) => {
    const {code} = putout(fixture.forOfStatement);
    const expected = fixture.forOfStatementFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: putout: variable-declarator', (t) => {
    const {code} = putout(fixture.variableDeclarator);
    const expected = fixture.variableDeclaratorFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: putout: arrow function expression', (t) => {
    const {code} = putout(fixture.arrowFunctionExpression);
    const expected = fixture.arrowFunctionExpressionFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: putout: function declaration', (t) => {
    const {code} = putout(fixture.functionDeclaration);
    const expected = fixture.functionDeclarationFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('remove-unused-variables: putout: import', (t) => {
    const {code} = putout(fixture.import);
    const expected = fixture.importFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

