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

