import {test, stub} from 'supertape';
import putout from 'putout';
import {runPlugins} from '../index.js';
import {_log} from './index.js';

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
            column: 1,
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
            column: 1,
        },
    }, {
        rule: 'exp',
        message: 'find',
        position: {
            line: 1,
            column: 12,
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
            column: 1,
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
            column: 1,
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
            column: 1,
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
            column: 1,
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
            column: 1,
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
            column: 1,
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
            column: 23,
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
            column: 7,
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
            column: 7,
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
    
    t.calledWith(debug, ['putout:runner:template', 'rule', 'path'], 'should call debug');
    t.end();
});
