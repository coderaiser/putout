'use strict';

const tryTo = require('try-to-tape');
const test = tryTo(require('tape'));
const putout = require('putout');

const removeConsole = require('..');
const {readFixtures} = require('./fixture');

const fixture = readFixtures([
    'property-identifier',
    'property-identifier-fix',
    'property-literal',
    'declared',
]);

test('plugin-remove-console: property identifier', (t) => {
    const {code} = putout(fixture.propertyIdentifier, {
        plugins: [{
            'remove-console': removeConsole,
        }]
    });
    const expected = fixture.propertyIdentifierFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('plugin-remove-console: property literal', (t) => {
    const {code} = putout(fixture.propertyLiteral, {
        plugins: [{
            'remove-console': removeConsole,
        }]
    });
    const expected = '\n\n';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('plugin-remove-console: declared', (t) => {
    const {code} = putout(fixture.declared, {
        plugins: [{
            'remove-console': removeConsole,
        }]
    });
    const expected = fixture.declared;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

