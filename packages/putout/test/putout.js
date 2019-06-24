'use strict';

const test = require('supertape');
const tryCatch = require('try-catch');

const putout = require('..');
const {readFixtures} = require('./fixture');

const fixture = readFixtures([
    'comment',
    'comment-fix',
    'no-vars',
    'root-vars',
    'import',
    'export-default-declaration',
    'export-default-declaration-fix',
    'shebang',
    'shebang-fix',
    'strict-mode',
    'strict-mode-fix',
    'strict-mode-fix-count',
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
            'remove-unused-variables',
        ],
    });
    
    const expected = {
        code: fixture.rootVars,
        places: [],
    };
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('putout: import', (t) => {
    const result = putout(fixture.import, {
        plugins: [
            'remove-unused-variables',
            'remove-empty',
        ],
    });
    
    const expected = '\n';
    
    t.deepEqual(result.code, expected, 'should equal');
    t.end();
});

test('putout: comment', (t) => {
    const result = putout(fixture.comment, {
        plugins: [
            'convert-commonjs-to-esm',
        ],
    });
    
    const expected = fixture.commentFix;
    
    t.deepEqual(result.code, expected, 'should equal');
    t.end();
});

test('putout: shebang', (t) => {
    const {code} = putout(fixture.shebang, {
        plugins: [
            'remove-unused-variables',
        ],
    });
    const expected = fixture.shebangFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: shebang: message', (t) => {
    const {places} = putout(fixture.shebang, {
        plugins: [
            'remove-unused-variables',
        ],
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
        ],
    });
    const expected = fixture.shebangFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: export default declaration', (t) => {
    const {code} = putout(fixture.exportDefaultDeclaration, {
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = fixture.exportDefaultDeclarationFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: export default declaration: espree', (t) => {
    const {code} = putout(fixture.exportDefaultDeclaration, {
        parser: 'espree',
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = fixture.exportDefaultDeclarationFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: export default declaration: acorn', (t) => {
    const {code} = putout(fixture.exportDefaultDeclaration, {
        parser: 'acorn',
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = fixture.exportDefaultDeclarationFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: export default declaration: custom parser', (t) => {
    const [e] = tryCatch(putout, fixture.exportDefaultDeclaration, {
        parser: 'custom',
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = `Cannot find module 'custom'`;
    t.ok(e.message.includes(expected), 'should equal');
    t.end();
});

test('putout: use strict', (t) => {
    const {code} = putout(fixture.strictMode, {
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = fixture.strictModeFix;
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: use strict: fixCount', (t) => {
    const {code} = putout(fixture.strictMode, {
        fixCount: 10,
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = fixture.strictModeFixCount;
    
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

test('putout: no loc', (t) => {
    const addVar = {
        report: () => '',
        fix: () => {},
        find: (ast, {traverse}) => {
            const places = [];
            
            traverse(ast, {
                Program(path) {
                    path.node.loc = null;
                    places.push(path);
                },
            });
            
            return places;
        },
    };
    
    const {places} = putout('', {
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    const expected = [{
        rule: 'add-variable',
        message: '',
        position: {
            line: 'x',
            column: 'x',
        },
    }];
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

test('putout: plugin: find: no return', (t) => {
    const addVar = {
        report: () => '',
        fix: () => {},
        find: (ast, {push, traverse}) => {
            traverse(ast, {
                Program(path) {
                    path.node.loc = null;
                    push(path);
                },
            });
        },
    };
    
    const {places} = putout('', {
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    const expected = [{
        rule: 'add-variable',
        message: '',
        position: {
            line: 'x',
            column: 'x',
        },
    }];
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

test('putout: plugin: return push in traverse', (t) => {
    const addVar = {
        report: () => '',
        fix: () => {},
        find: (ast, {push, traverse}) => {
            traverse(ast, {
                Program(path) {
                    path.node.loc = null;
                    return push(path);
                },
            });
        },
    };
    
    const {places} = putout('', {
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    const expected = [{
        rule: 'add-variable',
        message: '',
        position: {
            line: 'x',
            column: 'x',
        },
    }];
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

