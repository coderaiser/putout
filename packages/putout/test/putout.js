'use strict';

const test = require('supertape');

const putout = require('..');
const {readFixtures} = require('./fixture');

const fixture = readFixtures([
    'aligned',
    'no-vars',
    'root-vars',
    'export-default-declaration',
    'export-default-declaration-fix',
    'not-aligned',
    'shebang',
    'shebang-fix',
    'strict-mode',
    'strict-mode-fix',
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
    const result = putout(fixture.rootVars, {
        plugins: [
            'remove-unused-variables'
        ]
    });
    const expected = {
        code: fixture.rootVars,
        places: [],
    };
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('putout: align', (t) => {
    const {code} = putout(fixture.notAligned, {
        plugins: [
            'remove-unused-variables',
        ]
    });
    
    t.deepEqual(code, fixture.aligned, 'should equal');
    t.end();
});

test('putout: shebang', (t) => {
    const {code} = putout(fixture.shebang, {
        plugins: [
            'remove-unused-variables',
        ]
    });
    const expected = fixture.shebangFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: shebang: message', (t) => {
    const {places} = putout(fixture.shebang, {
        plugins: [
            'remove-unused-variables',
        ]
    });
    
    const {position} = places[0];
    const expected = {
        line: 8,
        column: 4,
    };
    
    t.deepEqual(position, expected, 'should equal');
    t.end();
});
test('putout: shebang', (t) => {
    const {code} = putout(fixture.shebang, {
        plugins: [
            'remove-unused-variables',
        ]
    });
    const expected = fixture.shebangFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: export default declaration', (t) => {
    const {code} = putout(fixture.exportDefaultDeclaration, {
        plugins: [
            'remove-unused-variables',
        ]
    });
    
    const expected = fixture.exportDefaultDeclarationFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: use strict', (t) => {
    const {code} = putout(fixture.strictMode, {
        plugins: [
            'remove-unused-variables',
        ]
    });
    
    const expected = fixture.strictModeFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: use strict: no fix', (t) => {
    const {code} = putout(fixture.strictMode, {
        fix: false,
    });
    
    const expected = fixture.strictMode;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

