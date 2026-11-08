import {test, stub} from 'supertape';
import putout from 'putout';
import {tryCatch} from 'try-catch';
import {runPlugins} from '#runner';
import {
    resetTime,
    setTime,
    getTime,
} from '#time';
import template, {_log} from './index.js';

const isUndefined = (a) => typeof a === 'undefined';

test('putout: plugin: traverse: template', (t) => {
    const exp = {
        report: () => '',
        fix: () => {},
        traverse: ({push}) => ({
            'module.exports = __object'(path) {
                push(path);
            },
        }),
    };
    
    const {places} = putout('module.exports = {a: 1}', {
        runPlugins,
        plugins: [{
            exp,
        }],
    });
    
    const expected = [{
        rule: 'exp',
        message: '',
        position: {
            line: 1,
            column: 0,
        },
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: plugin: traverse: template: expression', (t) => {
    const exp = {
        report: () => 'find',
        fix: () => {},
        traverse: ({push}) => ({
            'if (__) __'(path) {
                push(path);
            },
        }),
    };
    
    const {places} = putout('if (a > b) if (4 > 3) {}', {
        runPlugins,
        plugins: [{
            exp,
        }],
    });
    
    const expected = [{
        rule: 'exp',
        message: 'find',
        position: {
            line: 1,
            column: 0,
        },
    }, {
        rule: 'exp',
        message: 'find',
        position: {
            line: 1,
            column: 11,
        },
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: plugin: traverse: template: literal', (t) => {
    const exp = {
        report: () => '',
        fix: () => {},
        traverse: ({push}) => ({
            'console["__"]()'(path) {
                push(path);
            },
        }),
    };
    
    const {places} = putout('console["log"]()', {
        runPlugins,
        plugins: [{
            exp,
        }],
    });
    
    const expected = [{
        rule: 'exp',
        message: '',
        position: {
            line: 1,
            column: 0,
        },
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: plugin: traverse: similar', (t) => {
    const exp = {
        report: () => '',
        fix: () => {},
        traverse: ({push}) => ({
            'module.exports = __object'(path) {
                push(path);
            },
            'module.exports.__ = __object'(path) {
                push(path);
            },
        }),
    };
    
    const {places} = putout('module.exports = {a: 1}', {
        runPlugins,
        plugins: [{
            exp,
        }],
    });
    
    const expected = [{
        rule: 'exp',
        message: '',
        position: {
            line: 1,
            column: 0,
        },
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: plugin: traverse: template: null', (t) => {
    const ret = {
        report: () => '',
        fix: () => {},
        traverse: ({push}) => ({
            'return __'(path) {
                push(path);
            },
        }),
    };
    
    const {places} = putout('return null', {
        runPlugins,
        plugins: [{
            ret,
        }],
    });
    
    const expected = [{
        rule: 'ret',
        message: '',
        position: {
            line: 1,
            column: 0,
        },
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: plugin: traverse: template: word', (t) => {
    const exp = {
        report: () => '',
        fix: () => {},
        traverse: ({push}) => ({
            'debugger'(path) {
                push(path);
            },
        }),
    };
    
    const {places} = putout('debugger; module.exports = {a: 1}', {
        runPlugins,
        plugins: [{
            exp,
        }],
    });
    
    const expected = [{
        rule: 'exp',
        message: '',
        position: {
            line: 1,
            column: 0,
        },
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: plugin: traverse: template: __', (t) => {
    const exp = {
        report: () => '',
        fix: () => {},
        traverse: ({push}) => ({
            'module.exports = __'(path) {
                push(path);
            },
        }),
    };
    
    const {places} = putout('module.exports = {a: 1}', {
        runPlugins,
        plugins: [{
            exp,
        }],
    });
    
    const expected = [{
        rule: 'exp',
        message: '',
        position: {
            line: 1,
            column: 0,
        },
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: plugin: find: template: __', (t) => {
    const exp = {
        report: () => '',
        fix: () => {},
        find: (ast, {traverse, push}) => {
            traverse(ast, {
                'module.exports = __'(path) {
                    push(path);
                },
            });
        },
    };
    
    const {places} = putout('module.exports = {a: 1}', {
        runPlugins,
        plugins: [{
            exp,
        }],
    });
    
    const expected = [{
        rule: 'exp',
        message: '',
        position: {
            line: 1,
            column: 0,
        },
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: plugin: traverse: template: different', (t) => {
    const exp = {
        report: () => '',
        fix: () => {},
        traverse: ({push}) => ({
            'module.exports = {}'(path) {
                push(path);
            },
        }),
    };
    
    const {places} = putout('module.exports = 1', {
        runPlugins,
        plugins: [{
            exp,
        }],
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: plugin: find: template: exclude: node type', (t) => {
    const exp = {
        report: () => '',
        fix: () => {},
        find: (ast, {traverse, push}) => {
            traverse(ast, {
                'module.exports = __'(path) {
                    push(path);
                },
            });
        },
    };
    
    const {places} = putout('module.exports = {a: 1}', {
        runPlugins,
        rules: {
            exp: ['on', {
                exclude: ['AssignmentExpression'],
            }],
        },
        plugins: [{
            exp,
        }],
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: plugin: traverse: template: exclude: places', (t) => {
    const {places} = putout(`const t = 'hi'; const m = 1`, {
        runPlugins,
        fix: false,
        rules: {
            'variables/remove-unused': ['on', {
                exclude: ['const t = __'],
            }],
        },
        plugins: ['variables'],
    });
    
    const expected = [{
        message: `'m' is defined but never used`,
        position: {
            column: 22,
            line: 1,
        },
        rule: 'variables/remove-unused',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: plugin: traverse: template: exclude: multiple', (t) => {
    const {places} = putout(`const t = 'hi'; const m = 1`, {
        runPlugins,
        fix: false,
        rules: {
            'variables/remove-unused': ['on', {
                exclude: [
                    'const t = __',
                    'const m = __',
                ],
            }],
        },
        plugins: ['variables'],
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: plugin: traverse: template: exclude: fn', (t) => {
    const {places} = putout(`const t = () => {a()}`, {
        runPlugins,
        fix: false,
        rules: {
            'variables/remove-unused': ['on', {
                exclude: ['const __ = () => {}'],
            }],
        },
        plugins: ['variables'],
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: plugin: traverse: template: exclude: fn: FunctionDeclaration', (t) => {
    const {places} = putout(`const t = __`, {
        runPlugins,
        fix: false,
        rules: {
            'variables/remove-unused': ['on', {
                exclude: ['function __() {}'],
            }],
        },
        plugins: ['variables'],
    });
    
    const expected = [{
        message: `'t' is defined but never used`,
        position: {
            column: 6,
            line: 1,
        },
        rule: 'variables/remove-unused',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: plugin: traverse: template: log', (t) => {
    const {places} = putout(`const t = __`, {
        runPlugins,
        fix: false,
        rules: {
            'variables/remove-unused': ['on', {
                exclude: ['function __() {}'],
            }],
        },
        plugins: ['variables'],
    });
    
    const expected = [{
        message: `'t' is defined but never used`,
        position: {
            column: 6,
            line: 1,
        },
        rule: 'variables/remove-unused',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: engine: runner: template: log', (t) => {
    const debug = stub();
    const {__putout_debug} = globalThis;
    
    globalThis.__putout_debug = stub().returns(debug);
    
    _log();
    globalThis.__putout_debug = __putout_debug;
    
    t.notCalled(debug, 'should call debug');
    t.end();
});

test('putout: engine: runner: template: log: enabled', (t) => {
    const {__putout_debug} = globalThis;
    const debug = stub();
    
    debug.enabled = true;
    globalThis.__putout_debug = debug;
    
    _log('rule', 'path');
    globalThis.__putout_debug = __putout_debug;
    
    t.calledWith(debug, [
        'putout:runner:template',
        'rule',
        'path',
    ], 'should call debug');
    t.end();
});

const withTime = (fn) => {
    resetTime();
    setTime(true);
    
    const result = fn();
    
    resetTime();
    setTime(false);
    
    return result;
};

const lint = (code, plugin, name = 'exp') => {
    putout(code, {
        runPlugins,
        plugins: [
            [name, plugin],
        ],
    });
    
    return getTime().rules;
};

test('putout: plugin: traverse: template: time: visit', (t) => {
    const exp = {
        report: () => '',
        fix: () => {},
        traverse: () => ({
            'module.exports = __object'() {},
        }),
    };
    
    const [{rule, hits}] = withTime(() => lint('module.exports = {a: 1}', exp));
    
    const result = {
        rule,
        hits,
    };
    
    const expected = {
        rule: 'exp',
        hits: 1,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: plugin: traverse: template: time: exclude', (t) => {
    const exp = {
        report: () => '',
        fix: () => {},
        exclude: () => [
            'module.exports = __object',
        ],
        traverse: () => ({
            'module.exports = __object'() {},
        }),
    };
    
    const [{
        hits,
        match,
    }] = withTime(() => lint('module.exports = {a: 1}', exp));
    
    const result = {
        hits,
        matched: match >= 0,
    };
    
    const expected = {
        hits: 0,
        matched: true,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: plugin: traverse: template: time: include mismatch', (t) => {
    const exp = {
        report: () => '',
        fix: () => {},
        include: () => [
            'let __a = __b',
        ],
        traverse: () => ({
            'const __a = __b'() {},
        }),
    };
    
    const [{hits}] = withTime(() => lint('const a = 5', exp));
    
    t.equal(hits, 0);
    t.end();
});

test('putout: plugin: traverse: template: time: visitor throws', (t) => {
    const exp = {
        report: () => '',
        fix: () => {},
        traverse: () => ({
            'const __a = __b'() {
                throw Error('x');
            },
        }),
    };
    
    const [error, rules] = withTime(() => {
        const [e] = tryCatch(lint, 'const a = 5', exp);
        
        return [e, getTime().rules];
    });
    
    const result = {
        rule: error.rule,
        hits: rules[0].hits,
    };
    
    const expected = {
        rule: 'exp',
        hits: 1,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: plugin: traverse: template: time: visitor is not a function', (t) => {
    const exp = {
        report: () => '',
        fix: () => {},
        traverse: () => ({
            'const __a = __b': 5,
        }),
    };
    
    const [error] = withTime(() => tryCatch(lint, 'const a = 5', exp));
    
    t.match(error.message, 'Looks like provided visitor is not a function');
    t.end();
});

test('putout: plugin: traverse: template: time: no exclude: wrapped', (t) => {
    const Identifier = stub();
    
    const [visitor] = withTime(() => template({
        rule: 'exp',
        visitor: {
            Identifier,
        },
        options: {},
    }));
    
    t.notEqual(visitor.Identifier, Identifier);
    t.end();
});

test('putout: plugin: traverse: template: time: off: not wrapped', (t) => {
    const Identifier = stub();
    
    const [visitor] = template({
        rule: 'exp',
        visitor: {
            Identifier,
        },
        options: {},
    });
    
    t.equal(visitor.Identifier, Identifier);
    t.end();
});

test('putout: plugin: traverse: template: time: object visitor is not wrapped', (t) => {
    const Identifier = {
        enter: stub(),
    };
    
    const [visitor] = withTime(() => template({
        rule: 'exp',
        visitor: {
            Identifier,
        },
        options: {},
    }));
    
    t.equal(visitor.Identifier, Identifier);
    t.end();
});

test('putout: plugin: traverse: template: time: off: nothing collected', (t) => {
    resetTime();
    
    const exp = {
        report: () => '',
        fix: () => {},
        traverse: () => ({
            'module.exports = __object'() {},
        }),
    };
    
    const result = lint('module.exports = {a: 1}', exp);
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: plugin: traverse: template: time: no exclude: visit', (t) => {
    const exp = {
        report: () => '',
        fix: () => {},
        traverse: () => ({
            Identifier() {},
        }),
    };
    
    const [{hits}] = withTime(() => lint('const a = 5', exp));
    
    t.equal(hits, 1);
    t.end();
});

test('putout: plugin: traverse: template: time: calls and hits: matched', (t) => {
    const exp = {
        report: () => '',
        fix: () => {},
        traverse: () => ({
            'module.exports = __object'() {},
        }),
    };
    
    const [{
        calls,
        hits,
        match,
    }] = withTime(() => lint('module.exports = {a: 1}', exp));
    
    const result = {
        calls,
        hits,
        hasMatch: !isUndefined(match),
    };
    
    const expected = {
        calls: 1,
        hits: 1,
        hasMatch: true,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: plugin: traverse: template: time: calls and hits: excluded', (t) => {
    const exp = {
        report: () => '',
        fix: () => {},
        exclude: () => [
            'module.exports = __object',
        ],
        traverse: () => ({
            'module.exports = __object'() {},
        }),
    };
    
    const [{
        calls,
        hits,
    }] = withTime(() => lint('module.exports = {a: 1}', exp));
    
    const result = {
        calls,
        hits,
    };
    
    const expected = {
        calls: 1,
        hits: 0,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: plugin: traverse: template: time: calls and hits: include mismatch', (t) => {
    const exp = {
        report: () => '',
        fix: () => {},
        include: () => [
            'let __a = __b',
        ],
        traverse: () => ({
            'const __a = __b'() {},
        }),
    };
    
    const [{
        calls,
        hits,
    }] = withTime(() => lint('const a = 5', exp));
    
    const result = {
        calls,
        hits,
    };
    
    const expected = {
        calls: 1,
        hits: 0,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: plugin: traverse: template: time: plain visitor: no match', (t) => {
    const exp = {
        report: () => '',
        fix: () => {},
        traverse: () => ({
            Identifier() {},
        }),
    };
    
    const [rule] = withTime(() => lint('const a = 5', exp));
    
    const result = {
        sameCount: rule.calls === rule.hits,
        hasMatch: 'match' in rule,
    };
    
    const expected = {
        sameCount: true,
        hasMatch: false,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: plugin: traverse: template: time: exclude method: match without calls', (t) => {
    const exp = {
        report: () => '',
        fix: () => {},
        exclude: () => [
            'let __a = __b',
        ],
        traverse: () => ({
            Identifier() {},
        }),
    };
    
    const [rule] = withTime(() => lint('const a = 5', exp));
    const result = rule.match >= 0;
    
    t.ok(result);
    t.end();
});

test('putout: plugin: traverse: template: time: off: markMatch is not called', (t) => {
    resetTime();
    
    template({
        rule: 'exp',
        visitor: {
            'const __a = __b'() {},
        },
        options: {},
    });
    
    t.deepEqual(getTime().rules, []);
    t.end();
});

test('putout: plugin: traverse: template: include is checked before exclude', (t) => {
    const exp = {
        report: () => '',
        fix: () => {},
        exclude: () => [
            '@@@ not valid code',
        ],
        traverse: () => ({
            'const __a = __b'() {},
        }),
    };
    
    const [error] = tryCatch(lint, 'let a = 5', exp);
    
    t.notOk(error);
    t.end();
});
