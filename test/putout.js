'use strict';

const test = require('tape');

const putout = require('..');
const {readFixtures} = require('./fixture');

const fixture = readFixtures([
    'arrow-vars',
    'arrow-vars-fix',
    'no-vars',
    'root-vars',
    'aligned',
    'fn-vars',
    'fn-vars-fix',
    'fn-call',
    'fn-call-vars',
    'fn-call-vars-fix',
    'fn-closure-vars',
    'fn-closure-vars-fix',
    'fn-destr-args-vars',
    'not-aligned',
    'shebang',
    'destr-vars',
    'destr-vars-fix',
    'destr-nested-vars',
    'destr-nested-vars-fix',
    'strict-mode',
    'strict-mode-fix',
]);

test('putout: no vars', (t) => {
    const result = putout(fixture.noVars);
    const expected = {
        code: '',
        unused: [],
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
    const expected = '#!/usr/bin/env node\n\n\n\n';
    
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

test('putout: fn destr args vars', (t) => {
    const {code} = putout(fixture.fnDestrArgsVars);
    const expected = '\n';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: fn closure vars', (t) => {
    const {code} = putout(fixture.fnClosureVars);
    const expected = fixture.fnClosureVarsFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: use strict', (t) => {
    const {code} = putout(fixture.strictMode);
    const expected = fixture.strictModeFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

