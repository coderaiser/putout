'use strict';

const tryTo = require('try-to-tape');
const test = tryTo(require('tape'));
const putout = require('putout');

const splitVariableDeclarations = require('..');
const {readFixtures} = require('./fixture');

const fixture = readFixtures([
    'split-variable-declarations',
    'split-variable-declarations-fix',
    'for-statement',
    'for-statement-fix',
    'null-literal',
    'null-literal-fix',
]);

test('plugin-split-variable-declarations', (t) => {
    const {code} = putout(fixture.splitVariableDeclarations, {
        plugins: [{
            'split-variable-declarations': splitVariableDeclarations,
        }]
    });
    
    const expected = fixture.splitVariableDeclarationsFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('plugin-split-variable-declarations: for-statement', (t) => {
    const {code} = putout(fixture.forStatement, {
        plugins: [{
            'split-variable-declarations': splitVariableDeclarations,
        }]
    });
    
    const expected = fixture.forStatementFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('plugin-split-variable-declarations: null literal', (t) => {
    const {code} = putout(fixture.nullLiteral, {
        plugins: [{
            'split-variable-declarations': splitVariableDeclarations,
        }]
    });
    
    const expected = fixture.nullLiteralFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});
