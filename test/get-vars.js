'use strict';

const {join} = require('path');
const {readFileSync} = require('fs');

const test = require('tape');
const camelCase = require('just-camel-case');

const {
    parse,
} = require('..');

const getVars = require('../lib/get-vars');

const dirFixture = join(__dirname, 'fixture');
const readFixture = (name) => readFileSync(join(dirFixture, `${name}.js`), 'utf8');

const fixture = readFixtures([
    'no-vars',
    'root-vars',
    'fn-call',
    'fn-call-vars',
    'fn-vars',
    'fn-args-vars',
    'fn-hoisted-vars',
    'arrow-vars',
    'scope-vars',
    'shorthand-vars',
    'spread-vars',
    'for-of-vars',
    'obj-prop',
    'undeclared-vars',
]);

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

test('get-vars: root vars: returnPath', (t) => {
    const ast = parse(fixture.rootVars);
    const result = getVars(ast, {
        returnPath: true,
    });
    
    const {str} = result.pop();
    
    t.ok(str.path, 'should path be');
    t.end();
});

test('get-vars: fn call', (t) => {
    const ast = parse(fixture.fnCall);
    const result = getVars(ast, {
        returnPath: false,
    });
    
    const expected = [{
        require: {
            count: 1,
            loc: {
                line: 1,
                column: 0,
            },
        }
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: fn call: vars', (t) => {
    const ast = parse(fixture.fnCallVars);
    const result = getVars(ast, {
        returnPath: false,
    });
    
    const expected = [{
        t: {
            count: 1,
            loc: {
                line: 1,
                column: 6
            }
        },
        require: {
            count: 1,
            loc: {
                line: 2,
                column: 0,
            },
        },
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
                column: 9,
            }
        }
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: fn args vars', (t) => {
    const ast = parse(fixture.fnArgsVars);
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
        }
    }, {
        one: {
            count: 1,
            loc: {
                line: 1,
                column: 11,
            }
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: fn hoisted vars', (t) => {
    const ast = parse(fixture.fnHoistedVars);
    const result = getVars(ast, {
        returnPath: false,
    });
    
    const expected = [{
        log: {
            count: 2,
            loc: {
                line: 1,
                column: 0,
            }
        }
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: arrow vars', (t) => {
    const ast = parse(fixture.arrowVars);
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
                column: 6,
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

test('get-vars: for of vars', (t) => {
    const ast = parse(fixture.forOfVars);
    const result = getVars(ast, {
        returnPath: false,
    });
    
    const expected = [{
        array: {
            count: 2,
            loc: {
                line: 1,
                column: 6,
            }
        }
    }, {
        item: {
            count: 1,
            loc: {
                line: 2,
                column: 11,
            }
        }
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: obj prop', (t) => {
    const ast = parse(fixture.objProp);
    const result = getVars(ast, {
        returnPath: false,
    });
    
    const expected = [{
        module: {
            count: 2,
            loc: {
                line: 1,
                column: 6,
            }
        }
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: spread vars', (t) => {
    const ast = parse(fixture.spreadVars);
    const result = getVars(ast, {
        returnPath: false,
    });
    
    const expected = [{
        msg: {
            count: 2,
            loc: {
                line: 1,
                column: 6,
            }
        },
        obj: {
            count: 2,
            loc: {
                line: 3,
                column: 6,
            }
        },
        spread: {
            count: 1,
            loc: {
                line: 7,
                column: 6,
            }
        }
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: undeclared vars', (t) => {
    const ast = parse(fixture.undeclaredVars);
    const result = getVars(ast, {
        returnPath: false,
    });
    
    const expected = [];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

function readFixtures(names) {
    const result = {};
    
    for (const name of names) {
        const prop = camelCase(name);
        result[prop] = readFixture(name);
    }
    
    return result;
}

