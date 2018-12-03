'use strict';

const {join} = require('path');
const {readFileSync} = require('fs');

const test = require('tape');
const {
    parse,
} = require('recast');

const getVars = require('../lib/get-vars');

const dirFixture = join(__dirname, 'fixture');
const readFixture = (name) => readFileSync(join(dirFixture, `${name}.js`), 'utf8');
const fixture = {
    noVars: readFixture('no-vars'),
    rootVars: readFixture('root-vars'),
    fnVars: readFixture('fn-vars'),
    scopeVars: readFixture('scope-vars'),
    shorthandVars: readFixture('shorthand-vars'),
};

test('get-vars: no', (t) => {
    const ast = parse(fixture.noVars);
    const result = getVars(ast);
    const expected = [];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: root vars', (t) => {
    const ast = parse(fixture.rootVars);
    const result = getVars(ast, {
        returnPath: false,
    });
    
    const expected = [{
        str: {
            count: 2,
            loc: {
                line: 1,
                column: 6,
            }
        },
        str2: {
            count: 1,
            loc: {
                line: 2,
                column: 6
            }
        }
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: fn vars', (t) => {
    const ast = parse(fixture.fnVars);
    const result = getVars(ast, {
        returnPath: false,
    });
    
    const expected = [{
        one: {
            count: 2,
            loc: {
                line: 1,
                column: 6,
            }
        },
        f: {
            count: 1,
            loc: {
                line: 2,
                column: 0
            }
        }
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: scope vars', (t) => {
    const ast = parse(fixture.scopeVars);
    const result = getVars(ast, {
        returnPath: false,
    });
    
    const expected = [{
        f: {
            count: 1,
            loc: {
                line: 1,
                column: 6,
            }
        },
    }, {
        m: {
            count: 1,
            loc: {
                line: 2,
                column: 10
            }
        }
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: shorthand vars', (t) => {
    const ast = parse(fixture.shorthandVars);
    const result = getVars(ast, {
        returnPath: false,
    });
    
    const expected = [{
        name: {
            count: 2,
            loc: {
                line: 1,
                column: 6
            }
        },
        t: {
            count: 1,
            loc: {
                line: 2,
                column: 6
            }
        }
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

