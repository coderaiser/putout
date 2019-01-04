'use strict';

const tryTo = require('try-to-tape');
const test = tryTo(require('tape'));

const putout = require('..');
const {readFixtures} = require('./fixture');

const fixture = readFixtures([
    'aligned',
    'array-pattern',
    'array-pattern-fix',
    'arrow-function-expression',
    'arrow-function-expression-fix',
    'arrow-vars',
    'arrow-vars-fix',
    'debugger-statement',
    'debugger-statement-fix',
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
    'not-aligned',
    'shebang',
    'shebang-fix',
    'destr-vars',
    'destr-vars-fix',
    'destr-nested-vars',
    'destr-nested-vars-fix',
    'strict-mode',
    'strict-mode-fix',
    'return-statement',
    'return-statement-fix',
    'variable-declarator',
    'variable-declarator-fix',
]);

test('putout: no vars', (t) => {
    const result = putout(fixture.noVars);
    const expected = {
        code: '',
        places: [],
    };
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('putout: root vars', (t) => {
    const {code} = putout(fixture.rootVars);
    const expected = 'const str = \'hello\';\n';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: align', (t) => {
    const {code} = putout(fixture.notAligned);
    
    t.deepEqual(code, fixture.aligned, 'should equal');
    t.end();
});

test('putout: shebang', (t) => {
    const {code} = putout(fixture.shebang);
    const expected = fixture.shebangFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: array pattern', (t) => {
    const {code} = putout(fixture.arrayPattern);
    const expected = fixture.arrayPatternFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: arrow vars', (t) => {
    const {code} = putout(fixture.arrowVars);
    const expected = fixture.arrowVarsFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: destr vars', (t) => {
    const {code} = putout(fixture.destrVars);
    const expected = fixture.destrVarsFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: destr nested vars', (t) => {
    const {code} = putout(fixture.destrNestedVars);
    const expected = fixture.destrNestedVarsFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: fn vars', (t) => {
    const {code} = putout(fixture.fnVars);
    const expected = fixture.fnVarsFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: fn call', (t) => {
    const {code} = putout(fixture.fnCall);
    const expected = fixture.fnCall;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: fn call vars', (t) => {
    const {code} = putout(fixture.fnCallVars);
    const expected = fixture.fnCallVarsFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: fn args vars', (t) => {
    const {code} = putout(fixture.fnArgsVars);
    const expected = fixture.fnArgsVarsFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: fn destr args vars', (t) => {
    const {code} = putout(fixture.fnDestrArgsVars);
    const expected = '\n';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: return statement', (t) => {
    const {code} = putout(fixture.returnStatement);
    const expected = fixture.returnStatementFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: debugger statement', (t) => {
    const {code} = putout(fixture.debuggerStatement);
    const expected = fixture.debuggerStatementFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: for of statement', (t) => {
    const {code} = putout(fixture.forOfStatement);
    const expected = fixture.forOfStatementFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: variable-declarator', (t) => {
    const {code} = putout(fixture.variableDeclarator);
    const expected = fixture.variableDeclaratorFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: arrow function expression', (t) => {
    const {code} = putout(fixture.arrowFunctionExpression);
    const expected = fixture.arrowFunctionExpressionFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: function declaration', (t) => {
    const {code} = putout(fixture.functionDeclaration);
    const expected = fixture.functionDeclarationFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: use strict', (t) => {
    const {code} = putout(fixture.strictMode);
    const expected = fixture.strictModeFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

