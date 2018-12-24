'use strict';

const test = require('tape');

const {
    parse,
} = require('..');

const getVars = require('../lib/get-vars');
const {readFixtures} = require('./fixture');

const fixture = readFixtures([
    'no-vars',
    'root-vars',
    'condition-vars',
    'destr-vars',
    'destr-nested-vars',
    'destr-fn-vars',
    'no-root-vars',
    'fn-call',
    'fn-call-vars',
    'fn-call-shorthand-vars',
    'fn-vars',
    'fn-closure-vars',
    'fn-args-vars',
    'fn-destr-args-vars',
    'fn-hoisted-vars',
    'arrow-vars',
    'scope-vars',
    'shorthand-vars',
    'spread-vars',
    'for-of-vars',
    'obj-prop',
    'template-vars',
    'undeclared-vars',
]);

const du = 'du';
const d_ = 'd_';
const _u = '_u';
const dutify = (obj) => {
    const result = {};
    const entries = Object.entries(obj);
    
    for (const [name, {declared, used}] of entries) {
        const str = [
            declared ? 'd' : '_',
            used ? 'u' : '_',
        ].join('');
        
        result[name] = str;
    }
    
    return result;
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
    const result = getVars(ast);
    
    const expected = [{
        str: {
            declared: true,
            used: true,
        },
        str2: {
            declared: true,
            used: false,
        },
        str3: {
            declared: true,
            used: false,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: condition vars', (t) => {
    const ast = parse(fixture.conditionVars);
    const result = getVars(ast);
    
    const expected = [{
        msg: {
            declared: true,
            used: true,
        },
        x: {
            declared: true,
            used: true,
        },
        console: {
            declared: false,
            used: true,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: destr vars', (t) => {
    const ast = parse(fixture.destrVars);
    const result = getVars(ast).map(dutify);
    
    const expected = [{
        obj: du,
        a: d_,
        b: du,
        c: d_,
        console: _u,
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: destr nested vars', (t) => {
    const ast = parse(fixture.destrNestedVars);
    const result = getVars(ast);
    
    const expected = [{
        obj: {
            declared: true,
            used: true,
        },
        world: {
            declared: true,
            used: false,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: destr fn vars', (t) => {
    const ast = parse(fixture.destrFnVars);
    const result = getVars(ast);
    
    const expected = [{
        readFileSync: {
            declared: true,
            used: true
        },
        require: {
            declared: false,
            used: true,
        },
        m: {
            declared: true,
            used: false,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: no root vars', (t) => {
    const ast = parse(fixture.noRootVars);
    const result = getVars(ast);
    
    const expected = [{
        module: {
            declared: false,
            used: true,
        }
    }, {
        m: {
            declared: true,
            used: false,
        }
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: root vars: setPath', (t) => {
    const ast = parse(fixture.rootVars);
    const result = getVars(ast, {
        setPath: true,
    });
    
    const {str} = result.pop();
    
    t.ok(str.path, 'should path be');
    t.end();
});

test('get-vars: fn call', (t) => {
    const ast = parse(fixture.fnCall);
    const result = getVars(ast);
    
    const expected = [{
        require: {
            declared: false,
            used: true,
        }
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: fn call shorthand vars', (t) => {
    const ast = parse(fixture.fnCallShorthandVars);
    const result = getVars(ast);
    
    const expected = [{
        msg: {
            declared: true,
            used: true,
        },
        console: {
            declared: false,
            used: true,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: fn call: vars', (t) => {
    const ast = parse(fixture.fnCallVars);
    const result = getVars(ast, {
        setLoc: true,
    });
    
    const expected = [{
        t: {
            declared: true,
            used: true,
            loc: {
                line: 1,
                column: 6
            }
        },
        i: {
            declared: true,
            used: false,
            loc: {
                line: 2,
                column: 6,
            }
        },
        require: {
            declared: false,
            used: true,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: fn vars', (t) => {
    const ast = parse(fixture.fnVars);
    const result = getVars(ast);
    
    const expected = [{
        one: {
            declared: true,
            used: false,
        },
        module: {
            declared: false,
            used: true,
        }
    }, {
        one: {
            declared: true,
            used: false,
        }
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: fn closure vars', (t) => {
    const ast = parse(fixture.fnClosureVars);
    const result = getVars(ast);
    
    const expected = [{
        one: {
            declared: true,
            used: true,
        },
        two: {
            declared: true,
            used: true,
        },
        three: {
            declared: true,
            used: true,
        },
        f1: {
            declared: true,
            used: false,
        },
        f2: {
            declared: true,
            used: false,
        },
        f3: {
            declared: true,
            used: false,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: fn args vars', (t) => {
    const ast = parse(fixture.fnArgsVars);
    const result = getVars(ast);
    
    const expected = [{
        f: {
            declared: true,
            used: false,
        }
    }, {
        one: {
            declared: true,
            used: false,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: fn destr args vars', (t) => {
    const ast = parse(fixture.fnDestrArgsVars);
    const result = getVars(ast);
    
    const expected = [{
        arrow: {
            declared: true,
            used: false,
        }
    }, {
        one: {
            declared: true,
            used: false,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: fn hoisted vars', (t) => {
    const ast = parse(fixture.fnHoistedVars);
    const result = getVars(ast);
    
    const expected = [{
        log: {
            declared: true,
            used: true,
        }
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: arrow vars', (t) => {
    const ast = parse(fixture.arrowVars);
    const result = getVars(ast);
    
    const expected = [{
        one: {
            declared: true,
            used: true,
        },
        f: {
            declared: true,
            used: false,
        }
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: scope vars', (t) => {
    const ast = parse(fixture.scopeVars);
    const result = getVars(ast);
    
    const expected = [{
        f: {
            declared: true,
            used: false,
        },
    }, {
        m: {
            declared: true,
            used: false,
        }
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: shorthand vars', (t) => {
    const ast = parse(fixture.shorthandVars);
    const result = getVars(ast);
    
    const expected = [{
        name: {
            declared: true,
            used: true,
        },
        t: {
            declared: true,
            used: false,
        }
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: for of vars', (t) => {
    const ast = parse(fixture.forOfVars);
    const result = getVars(ast);
    
    const expected = [{
        array: {
            declared: true,
            used: true,
        }
    }, {
        item: {
            declared: true,
            used: false,
        }
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: obj prop', (t) => {
    const ast = parse(fixture.objProp);
    const result = getVars(ast);
    
    const expected = [{
        module: {
            declared: true,
            used: true,
        }
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: spread vars', (t) => {
    const ast = parse(fixture.spreadVars);
    const result = getVars(ast);
    
    const expected = [{
        msg: {
            declared: true,
            used: true,
        },
        obj: {
            declared: true,
            used: true,
        },
        spread: {
            declared: true,
            used: false,
        }
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: template vars', (t) => {
    const ast = parse(fixture.templateVars);
    const result = getVars(ast);
    
    const expected = [{
        x: {
            declared: true,
            used: true,
        },
        y: {
            declared: true,
            used: true,
        },
        z: {
            declared: true,
            used: true,
        },
        msg: {
            declared: true,
            used: false,
        },
        console: {
            declared: false,
            used: true,
        },
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

test('get-vars: undeclared vars', (t) => {
    const ast = parse(fixture.undeclaredVars);
    const result = getVars(ast);
    
    const expected = [{
        module: {
            declared: false,
            used: true,
        }
    }];
    
    t.deepEqual(result, expected, 'should equal');
    t.end();
});

