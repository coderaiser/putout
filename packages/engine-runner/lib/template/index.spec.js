'use strict';

const test = require('supertape');
const putout = require('putout');
const mockRequire = require('mock-require');
const stub = require('@cloudcmd/stub');

const {runPlugins} = require('..');

const {reRequire, stopAll} = mockRequire;

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
    
    t.deepEqual(places, expected, 'should equal');
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
    
    t.deepEqual(places, expected, 'should equal');
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
    
    t.deepEqual(places, expected, 'should equal');
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
    
    t.deepEqual(places, expected, 'should equal');
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
    
    t.deepEqual(places, expected, 'should equal');
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
    
    t.deepEqual(places, expected, 'should equal');
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
    
    t.deepEqual(places, expected, 'should equal');
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
    
    t.deepEqual(places, expected, 'should equal');
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
    
    t.deepEqual(places, expected, 'should equal');
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
                exclude: [
                    'AssignmentExpression',
                ],
            }],
        },
        plugins: [{
            exp,
        }],
    });
    
    const expected = [];
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

test('putout: plugin: traverse: template: exclude: places', (t) => {
    const {places} = putout(`const t = 'hi'; const m = 1`, {
        runPlugins,
        fix: false,
        rules: {
            'remove-unused-variables': ['on', {
                exclude: [
                    'const t = __',
                ],
            }],
        },
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = [{
        message: `'m' is defined but never used`,
        position: {
            column: 22,
            line: 1,
        },
        rule: 'remove-unused-variables',
    }];
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

test('putout: plugin: traverse: template: exclude: multiple', (t) => {
    const {places} = putout(`const t = 'hi'; const m = 1`, {
        runPlugins,
        fix: false,
        rules: {
            'remove-unused-variables': ['on', {
                exclude: [
                    'const t = __',
                    'const m = __',
                ],
            }],
        },
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = [];
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

test('putout: plugin: traverse: template: exclude: fn', (t) => {
    const {places} = putout(`const t = () => {a()}`, {
        runPlugins,
        fix: false,
        rules: {
            'remove-unused-variables': ['on', {
                exclude: [
                    'const __ = () => {}',
                ],
            }],
        },
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = [];
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

test('putout: plugin: traverse: template: exclude: fn: FunctionDeclaration', (t) => {
    const {places} = putout(`const t = __`, {
        runPlugins,
        fix: false,
        rules: {
            'remove-unused-variables': ['on', {
                exclude: [
                    'function __() {}',
                ],
            }],
        },
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = [{
        message: `'t' is defined but never used`,
        position: {
            column: 6,
            line: 1,
        },
        rule: 'remove-unused-variables',
    }];
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

test('putout: plugin: traverse: template: log', (t) => {
    const {places} = putout(`const t = __`, {
        runPlugins,
        fix: false,
        rules: {
            'remove-unused-variables': ['on', {
                exclude: [
                    'function __() {}',
                ],
            }],
        },
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const expected = [{
        message: `'t' is defined but never used`,
        position: {
            column: 6,
            line: 1,
        },
        rule: 'remove-unused-variables',
    }];
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

test('putout: engine: runner: template: log', (t) => {
    const debug = stub();
    
    mockRequire('debug', stub().returns(debug));
    const {_log} = reRequire('.');
    
    _log();
    stopAll();
    
    t.notOk(debug.called, 'should call debug');
    t.end();
});

test('putout: engine: runner: template: log: enabled', (t) => {
    const debug = stub();
    debug.enabled = true;
    
    mockRequire('debug', stub().returns(debug));
    const {_log} = reRequire('.');
    
    _log('rule', 'path');
    stopAll();
    
    t.calledWith(debug, ['rule', 'path'], 'should call debug');
    t.end();
});
