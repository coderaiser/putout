'use strict';

const test = require('supertape');
const putout = require('../../putout');

test('putout: plugin: traverse: template', (t) => {
    const exp = {
        report: () => '',
        fix: () => {},
        traverse: ({push}) => ({
            'module.exports = {}'(path) {
                push(path);
            },
        }),
    };
    
    const {places} = putout('module.exports = {a: 1}', {
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
            'module.exports = {}'(path) {
                push(path);
            },
            'module.exports.__ = {}'(path) {
                push(path);
            },
        }),
    };
    
    const {places} = putout('module.exports = {a: 1}', {
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
        plugins: [{
            exp,
        }],
    });
    
    const expected = [];
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

test('putout: plugin: find: template: exclude', (t) => {
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
        rules: {
            exp: ['on', {
                exclude: [
                    'module.exports = __',
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

test('putout: plugin: traverse: template: exclude', (t) => {
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
        rules: {
            exp: ['on', {
                exclude: [
                    'module.exports = __',
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

test('putout: plugin: traverse: template: exclude', (t) => {
    const {places} = putout(`const t = 'hi'; const m = 1`, {
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
        message: '"m" is defined but never used',
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
    const {places} = putout(`const t = () => {}`, {
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
