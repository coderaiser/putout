'use strict';

const test = require('supertape');
const putout = require('putout');
const stub = require('@cloudcmd/stub');

const {readFixtures} = require('./fixture');
const {runPlugins} = require('..');

const fixture = readFixtures([
    'import',
]);

test('putout: run plugins', (t) => {
    const result = putout(fixture.import, {
        runPlugins,
        plugins: [
            'remove-unused-variables',
            'remove-empty',
        ],
    });
    
    const expected = '\n';
    
    t.deepEqual(result.code, expected, 'should equal');
    t.end();
});

test('putout: run plugins: disable, using "off"', (t) => {
    const result = putout(fixture.import, {
        runPlugins,
        rules: {
            'remove-unused-variables': 'off',
            'remove-empty': 'off',
        },
        plugins: [
            'remove-unused-variables',
            'remove-empty',
        ],
    });
    
    const expected = fixture.import;
    
    t.deepEqual(result.code, expected, 'should equal');
    t.end();
});

test('putout: filter: options', (t) => {
    const addVar = {
        report: () => '',
        fix: stub(),
        include: () => [
            'debugger',
        ],
        filter: (path, {options}) => {
            return options.ok;
        },
    };
    
    const code = 'debugger';
    
    const {places} = putout(code, {
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
        rules: {
            'add-variable': ['on', {
                ok: true,
            }],
        },
    });
    
    const expected = [{
        rule: 'add-variable',
        message: '',
        position: {
            line: 1,
            column: 0,
        },
    }];
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

test('putout: filter: options: no filter call', (t) => {
    const addVar = {
        report: () => '',
        fix: stub(),
        include: () => [
            'debugger',
        ],
        filter: (path, {options}) => {
            return options.ok;
        },
    };
    
    const code = 'debugger';
    
    const {places} = putout(code, {
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
        rules: {
            'add-variable': ['on', {
                ok: false,
            }],
        },
    });
    
    const expected = [];
    
    t.deepEqual(places, expected, 'should equal');
    t.end();
});

test('putout: plugins: replace', (t) => {
    const addVar = {
        report: () => '',
        replace: () => ({
            debugger: 'const a = 1',
        }),
    };
    
    const {code} = putout('debugger', {
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    const expected = 'const a = 1;';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: plugins: replace: a couple', (t) => {
    const addVar = {
        report: () => '',
        replace: () => ({
            'debugger': 'const a = 1',
            'var x = 1': 'const x = 1',
        }),
    };
    
    const {code} = putout('var x = 1', {
        runPlugins,
        plugins: [{
            'add-variable': addVar,
        }],
    });
    
    const expected = 'const x = 1;';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: plugins: replace: remove', (t) => {
    const rmDebugger = {
        report: () => '',
        replace: () => ({
            debugger: '',
        }),
    };
    
    const {code} = putout('debugger', {
        runPlugins,
        plugins: [{
            'rm-debugger': rmDebugger,
        }],
    });
    
    const expected = '';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: plugins: replace: remove: exclude', (t) => {
    const rmDebugger = {
        report: () => '',
        replace: () => ({
            debugger: '',
        }),
    };
    
    const {code} = putout('debugger', {
        runPlugins,
        rules: {
            'rm-debugger': ['on', {
                exclude: 'debugger',
            }],
        },
        plugins: [{
            'rm-debugger': rmDebugger,
        }],
    });
    
    const expected = 'debugger';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: plugins: replace: template', (t) => {
    const varToConst = {
        report: () => '',
        replace: () => ({
            'var __a = __b': 'const __a = __b',
        }),
    };
    
    const {code} = putout('var hello = 5', {
        fixCount: 1,
        runPlugins,
        plugins: [{
            'var-to-const': varToConst,
        }],
    });
    
    const expected = 'const hello = 5;';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: plugins: replace: template: a couple vars', (t) => {
    const varToConst = {
        report: () => '',
        replace: () => ({
            'const __a = __b': 'const __b = __a',
            'debugger': '',
        }),
    };
    
    const {code} = putout('debugger; const hello = world', {
        fixCount: 1,
        runPlugins,
        plugins: [{
            'var-to-const': varToConst,
        }],
    });
    
    const expected = 'const world = hello;';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: plugins: replace: template: array', (t) => {
    const varToConst = {
        report: () => '',
        replace: () => ({
            'const __a = __b[0]': 'const [__a] = __b',
        }),
    };
    
    const {code} = putout('const first = elements[0]', {
        fixCount: 1,
        runPlugins,
        plugins: [{
            'var-to-const': varToConst,
        }],
    });
    
    const expected = 'const [first] = elements;';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: plugins: replace: template: identifier', (t) => {
    const varToConst = {
        report: () => '',
        replace: () => ({
            '!!__a': '__a',
        }),
    };
    
    const {code} = putout('if (!!y) fn()', {
        fixCount: 1,
        runPlugins,
        plugins: [{
            'var-to-const': varToConst,
        }],
    });
    
    const expected = 'if (y) fn()';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: plugins: replace: template: ifCondition', (t) => {
    const varToConst = {
        report: () => '',
        replace: () => ({
            'if (!!__a) __b': 'if (__a) __b',
        }),
    };
    
    const {code} = putout('if (!!y) fn()', {
        fixCount: 1,
        runPlugins,
        plugins: [{
            'var-to-const': varToConst,
        }],
    });
    
    const expected = 'if (y)\n  fn();';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: plugins: replace: template: ifCondition: body', (t) => {
    const varToConst = {
        report: () => '',
        replace: () => ({
            'if (!!__a) __b': 'if (__a) __b',
        }),
    };
    
    const {code} = putout('if (!!y) {fn()}', {
        fixCount: 1,
        runPlugins,
        plugins: [{
            'var-to-const': varToConst,
        }],
    });
    
    const expected = 'if (y)\n  {fn()}';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: plugins: replace: template: object pattern', (t) => {
    const varToConst = {
        report: () => '',
        replace: () => ({
            'const __a = __b.__a': 'const {__a} = __b',
        }),
    };
    
    const {code} = putout('const hello = world.hello', {
        fixCount: 1,
        runPlugins,
        plugins: [{
            'var-to-const': varToConst,
        }],
    });
    
    const expected = 'const {\n  hello\n} = world;';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: plugins: replace: template: infinite loop', (t) => {
    const varToConst = {
        report: () => '',
        replace: () => ({
            'const __a = __b': 'let __a = __b',
            'let __a = __b' : 'const __b = __a',
        }),
    };
    
    const {code} = putout('const hello = world', {
        fixCount: 1,
        runPlugins,
        plugins: [{
            'var-to-const': varToConst,
        }],
    });
    
    const expected = 'const world = hello;';
    
    t.deepEqual(code, expected, 'should equal');
    t.end();
});

test('putout: plugins: replace: template: same', (t) => {
    const applyToSpread = {
        report: () => '',
        replace: () => ({
            'console.log.apply(/*hello*/ console, lines)': 'console.log(...lines)',
        }),
    };
    
    const {code} = putout('console.log(...lines)', {
        fixCount: 1,
        runPlugins,
        plugins: [{
            'apply-to-spread': applyToSpread,
        }],
    });
    
    const expected = 'console.log(...lines)';
    
    t.deepEqual(code, expected);
    t.end();
});

test('putout: plugins: replace: template: linked literal node', (t) => {
    const applyToSpread = {
        report: () => '',
        replace: () => ({
            'import __a from "__b"': 'const __a = require("__b")',
        }),
    };
    
    const {code} = putout('import hello from "world"', {
        fixCount: 1,
        runPlugins,
        plugins: [{
            'apply-to-spread': applyToSpread,
        }],
    });
    
    const expected = 'const hello = require("world");';
    
    t.deepEqual(code, expected);
    t.end();
});

test('putout: plugins: replace: template: function: __imports', (t) => {
    const applyToSpread = {
        report: () => '',
        replace: () => ({
            'import __imports from "__a"': ({__imports, __a}) => {
                let result = 'const {\n';
                
                for (const {imported, local} of __imports) {
                    result += `${imported.name},`;
                }
                
                result += `\n} = require(${__a.raw});`;
                
                return result;
            },
        }),
    };
    
    const {code} = putout('import {hello} from "world"', {
        runPlugins,
        plugins: [{
            'convert-esm-to-commonjs': applyToSpread,
        }],
    });
    
    const expected = `const {\n  hello\n} = require('world');`;
    
    t.deepEqual(code, expected);
    t.end();
});

test('putout: plugins: replace: template: function: __args', (t) => {
    const applyToSpread = {
        report: () => '',
        replace: () => ({
            'function __a(__args){}': 'const __a = (__args) => {}',
        }),
    };
    
    const {code} = putout('function hello(a, b, c){}', {
        runPlugins,
        plugins: [{
            'convert-to-arrow': applyToSpread,
        }],
    });
    
    const expected = 'const hello = (a, b, c) => {};';
    
    t.deepEqual(code, expected);
    t.end();
});

test('putout: plugins: replace: template: function: __args, skip', (t) => {
    const applyToSpread = {
        report: () => '',
        replace: () => ({
            'const __a = require("__b")': ({}, skip) => {
                return skip;
            },
        }),
    };
    
    const {code} = putout('const fs = require("fs")', {
        runPlugins,
        plugins: [{
            'convert-commonjs-to-esm': applyToSpread,
        }],
    });
    
    const expected = 'const fs = require("fs");';
    
    t.deepEqual(code, expected);
    t.end();
});

