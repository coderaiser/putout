import process from 'node:process';
import Module from 'node:module';
import {test, stub} from 'supertape';
import {tryCatch} from 'try-catch';
import putout from 'putout';
import montag from 'montag';
import {tryToCatch} from 'try-to-catch';
import {readFixtures} from './fixture.js';
import {loadPlugins} from '../lib/index.js';

const {putoutAsync} = putout;

const fixture = readFixtures(['shebang', 'shebang-fix']);

test('putout: loader: user plugin', (t) => {
    const {_findPath} = Module;
    const rmVars = 'remove-debugger';
    
    Module._findPath = stub((name, paths) => {
        if (!name.indexOf(`@putout/plugin-${rmVars}`))
            return false;
        
        if (name === `putout-plugin-${rmVars}`)
            return name;
        
        return _findPath(name, paths);
    });
    
    const [error] = tryCatch(putout, `debugger`, {
        loadPlugins,
        plugins: [rmVars],
    });
    
    Module._findPath = _findPath;
    
    t.equal(error.message, `ENOENT: no such file or directory, open 'putout-plugin-remove-debugger'`);
    t.end();
});

test('putout: loader: can not find', (t) => {
    const [e] = tryCatch(putout, `const t = 'hello'`, {
        plugins: ['xxx'],
    });
    
    const expected = 'Plugin "putout-plugin-xxx" could not be found!';
    
    t.equal(e.message, expected);
    t.end();
});

test('putout: loader: function', async (t) => {
    const rmVars = 'remove-debugger';
    const rmVarsPlugin = await import(`@putout/plugin-${rmVars}`);
    const {_findPath} = Module;
    
    Module._findPath = stub(createFindPath(rmVars, _findPath));
    
    const {code} = putout(`debugger;`, {
        plugins: [{
            [rmVars]: rmVarsPlugin,
        }],
    });
    
    Module._findPath = _findPath;
    
    t.equal(code, '\n');
    t.end();
});

test('putout: loader: function: rules', async (t) => {
    const rmVars = 'remove-debugger';
    const rmVarsPlugin = await import(`@putout/plugin-${rmVars}`);
    
    const {_findPath} = Module;
    
    Module._findPath = stub(createFindPath(rmVars, _findPath));
    
    const {code} = putout(`debugger`, {
        plugins: [{
            'brand-new-rule': {
                rules: {
                    [rmVars]: rmVarsPlugin,
                },
            },
        }],
    });
    
    Module._findPath = _findPath;
    
    t.equal(code, '\n');
    t.end();
});

test('putout: loader: disabled rule', async (t) => {
    const rmVars = 'remove-debugger';
    const rmVarsPlugin = await import(`@putout/plugin-${rmVars}`);
    
    const {_findPath} = Module;
    
    Module._findPath = stub(createFindPath(rmVars, _findPath));
    
    const {code} = putout(`debugger`, {
        rules: {
            [rmVars]: false,
        },
        plugins: [{
            [rmVars]: rmVarsPlugin,
        }],
    });
    
    Module._findPath = _findPath;
    
    t.equal(code, `debugger;\n`);
    t.end();
});

test('putout: loader: disabled rule from multi rule plugin', (t) => {
    const source = `montag
        const t = async () => {
            return 'hello'
        }
    `;
    
    const {places} = putout(source, {
        fix: false,
        rules: {
            'promises/remove-useless-async': 'off',
            'promises/remove-useless-resolve': 'on',
        },
        plugins: ['promises'],
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: loader: plugins: array', async (t) => {
    const rmVars = 'remove-debugger';
    const rmVarsPlugin = await import(`@putout/plugin-${rmVars}`);
    
    const {_findPath} = Module;
    
    Module._findPath = createFindPath(rmVars, _findPath);
    
    const {code} = putout(`debugger;`, {
        rules: {
            [rmVars]: false,
        },
        plugins: [
            ['remove-debugger', rmVarsPlugin],
        ],
    });
    
    Module._findPath = _findPath;
    
    t.equal(code, `debugger;\n`);
    t.end();
});

test('putout: loader: nested rules', (t) => {
    const {code} = putout(fixture.shebang, {
        rules: {
            'putout/convert-babel-types': 'off',
            'variables': 'off',
        },
        plugins: [
            'variables',
            'putout',
        ],
    });
    
    t.deepEqual(code, fixture.shebang);
    t.end();
});

test('putout: loader: no plugin for a rule', (t) => {
    const {places} = putout('hello', {
        rules: {
            abcd: 'off',
        },
        plugins: [],
    });
    
    const expected = [{
        message: `No plugin found for a rule: 'abcd'`,
        position: {
            column: 1,
            line: 1,
        },
        rule: 'loader',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: loader: nested rule: one', (t) => {
    const [e] = tryCatch(putout, 'hello', {
        rules: {
            'putout/convert-babel-types': 'off',
        },
        plugins: ['putout'],
    });
    
    t.notOk(e);
    t.end();
});

test('putout: loader: no options', (t) => {
    const [e] = tryCatch(loadPlugins);
    
    t.equal(e.message, 'options should be an object!');
    t.end();
});

test('putout: loader: no options.pluginNames', (t) => {
    const {places} = putout('hello', {
        loadPlugins,
    });
    
    t.notOk(places.length);
    t.end();
});

test('putout: loader: enable part of plugin', (t) => {
    const source = `const {run} = require('madrun');`;
    
    const {code} = putout(source, {
        fix: true,
        rules: {
            'nodejs/convert-esm-to-commonjs': 'off',
            'nodejs/convert-commonjs-to-esm': 'on',
        },
        plugins: ['nodejs'],
    });
    
    const expected = `import {run} from 'madrun';\n`;
    
    t.equal(code, expected, 'should enable one of rules in plugin');
    t.end();
});

test('putout: loader: disabled part of rule', (t) => {
    const code = montag`
        const {run} = require('madrun');
        
        module.exports = {
            'lint': () => 'bin/putout.js .',
            'fix:lint': () => run('lint', '--fix'),
        };
    `;
    
    const {places} = putout(code, {
        fix: false,
        rules: {
            'madrun': 'on',
            'madrun/add-madrun-to-lint': 'off',
            'madrun/add-fresh-lint': 'off',
        },
        plugins: ['madrun'],
    });
    
    const expected = [{
        message: `Use 'lint' to check current directory`,
        position: {
            column: 18,
            line: 3,
        },
        rule: 'madrun/set-lint-dot',
    }];
    
    t.deepEqual(places, expected, 'should disable one of rules in plugin');
    t.end();
});

test('putout: loader: enable part of rule', (t) => {
    const code = montag`
        const {run} = require('madrun');
        
        module.exports = {
            'lint': 'putout .',
        };
    `;
    
    const {places} = putout(code, {
        fix: false,
        rules: {
            'madrun': 'off',
            'madrun/add-function': 'on',
        },
        plugins: ['madrun'],
    });
    
    const expected = [{
        message: `Use 'function' instead of 'string' in script: 'lint'`,
        position: {
            column: 13,
            line: 4,
        },
        rule: 'madrun/add-function',
    }];
    
    t.deepEqual(places, expected, 'should disable all but couple of rules in plugin');
    t.end();
});

test('putout: loader: plugin is a function', (t) => {
    const [e] = tryCatch(putout, 'hello', {
        loadPlugins,
        plugins: [
            ['fn', () => {}],
        ],
    });
    
    t.equal(e.message, `☝️ Cannot determine type of plugin 'fn'. Here is list of supported plugins: https://git.io/JqcMn`);
    t.end();
});

test('putout: loader: declcarator', (t) => {
    const {code} = putout(`isString('hello')`, {
        loadPlugins,
        plugins: [
            ['declare', {
                declare: () => ({
                    isString: 'const isString = (a) => typeof a === "string"',
                }),
            }],
        ],
    });
    
    const expected = montag`
        const isString = (a) => typeof a === 'string';
        isString('hello');\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: loader: ESM', async (t) => {
    const estrace = await import('estrace/plugin');
    
    const [e] = tryCatch(putout, 'hello', {
        loadPlugins,
        rules: {
            'estrace/trace': ['on', {
                url: 'file://hello.js',
            }],
        },
        plugins: [
            ['estrace', estrace],
        ],
    });
    
    t.notOk(e);
    t.end();
});

test('putout: loader: namespace', (t) => {
    const source = `const {run} = require('madrun');`;
    
    const {code} = putout(source, {
        fix: true,
        rules: {
            'nodejs/convert-commonjs-to-esm': 'on',
        },
        plugins: ['@putout/plugin-nodejs'],
    });
    
    const expected = `import {run} from 'madrun';\n`;
    
    t.equal(code, expected, 'should enable one of rules in plugin');
    t.end();
});

test('putout: loader: wrong plugin name', (t) => {
    const source = `const {run} = require('madrun');`;
    
    const [error] = tryCatch(putout, source, {
        plugins: [
            [putout, putout],
        ],
    });
    
    const expected = `☝️ Looks like plugin name type is not 'string', but: 'function'`;
    
    t.equal(error.message, expected);
    t.end();
});

test('putout: loader: async: import', async (t) => {
    const source = `const {run} = require('madrun');`;
    const {code} = await putoutAsync(source, {
        rules: {
            'nodejs/convert-commonjs-to-esm': 'on',
        },
        plugins: ['import:@putout/plugin-nodejs'],
    });
    
    const expected = `import {run} from 'madrun';\n`;
    
    t.equal(code, expected, 'should enable one of rules in plugin');
    t.end();
});

test('putout: loader: sync: import', (t) => {
    const source = `const {run} = require('madrun');`;
    
    const {code} = putout(source, {
        rules: {
            'nodejs/convert-commonjs-to-esm': 'on',
        },
        plugins: ['import:@putout/plugin-nodejs'],
    });
    
    const expected = `import {run} from 'madrun';\n`;
    
    t.equal(code, expected);
    t.end();
});

test('putout: loader: sync: import: shorten', async (t) => {
    const source = `const {run} = require('madrun');`;
    const {places} = await putoutAsync(source, {
        fix: false,
        rules: {
            'nodejs/convert-commonjs-to-esm': 'on',
        },
        plugins: ['import:@putout/plugin-nodejs'],
    });
    
    const expected = [{
        message: `Use 'ESM' instead of 'CommonJS'`,
        position: {
            column: 1,
            line: 1,
        },
        rule: 'nodejs/convert-commonjs-to-esm/require',
    }, {
        message: `Add missing 'use strict' directive on top of CommonJS`,
        position: {
            column: 1,
            line: 1,
        },
        rule: 'nodejs/add-missing-strict-mode',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: loader: sync: load ESM: code', (t) => {
    const source = `const {run} = require('madrun');`;
    const [error] = tryCatch(putout, source, {
        plugins: ['@putout/plugin-apply-nullish-coalescing'],
    });
    
    if (process.version.startsWith('v2'))
        return t.notOk(error);
    
    t.equal(error.code, 'ERR_REQUIRE_ESM');
    t.end();
});

test('putout: loader: sync: load ESM: message', (t) => {
    const source = `const {run} = require('madrun');`;
    const [error] = tryCatch(putout, source, {
        plugins: ['@putout/plugin-apply-nullish-coalescing'],
    });
    
    if (process.version.startsWith('v2'))
        return t.notOk(error);
    
    t.equal(error.message, `☝️ Looks like '@putout/plugin-apply-nullish-coalescing' is ESM, use 'await putoutAsync()' instead`);
    t.end();
});

test('putout: loader: sync: load ESM: name', (t) => {
    const source = `const {run} = require('madrun');`;
    const [error] = tryCatch(putout, source, {
        plugins: ['apply-nullish-coalescing'],
    });
    
    if (process.version.startsWith('v2'))
        return t.notOk(error);
    
    t.equal(error.name, 'apply-nullish-coalescing');
    t.end();
});

test('putout: loader: disabled rules in plugin', (t) => {
    const source = `'use strict';\n\nconst {run} = require('madrun');\n`;
    const {code} = putout(source, {
        plugins: ['nodejs'],
    });
    
    t.equal(code, source);
    t.end();
});

test('putout: loader: disabled rules in plugin: enable', (t) => {
    const source = `const {run} = require('madrun');\n`;
    const {code} = putout(source, {
        rules: {
            'nodejs/convert-commonjs-to-esm/require': 'on',
        },
        plugins: ['nodejs'],
    });
    
    const expected = `import {run} from 'madrun';\n`;
    
    t.equal(code, expected);
    t.end();
});

test('putout: loader: disabled rules in plugin: load', async (t) => {
    const source = `const {run} = require('madrun');\n`;
    const convert = await import('@putout/plugin-nodejs/convert-commonjs-to-esm');
    const {code} = putout(source, {
        rules: {
            'nodejs/convert-commonjs-to-esm-require': 'on',
        },
        plugins: [
            [
                'nodejs',
                ['on', convert],
            ],
        ],
    });
    
    const expected = `import {run} from 'madrun';\n`;
    
    t.equal(code, expected);
    t.end();
});

test('putout: loader: similar names', (t) => {
    const source = montag`
        export const match = () => ({
            '__a(__args': (vars, path) => {
                return __args[__a];
            }
        });
    `;
    
    const {code} = putout(source, {
        rules: {
            'putout/declare': 'off',
            'putout/declare-template-variables': 'on',
        },
        plugins: ['putout'],
    });
    
    const expected = montag`
        export const match = () => ({
            '__a(__args': ({__args, __a}, path) => {
                return __args[__a];
            },
        });\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('putout: loader: enable part of rule: async: before', async (t) => {
    const code = montag`
        const {Identifier} = types;
        Identifier('x');
    `;
    
    const {places} = await putoutAsync(code, {
        fix: false,
        rules: {
            'putout/apply-lowercase-to-node-builders': 'on',
            'putout': 'off',
        },
        plugins: ['putout'],
    });
    
    const expected = [{
        message: `Use lowercased node builders`,
        position: {
            column: 1,
            line: 2,
        },
        rule: 'putout/apply-lowercase-to-node-builders',
    }];
    
    t.deepEqual(places, expected, 'should disable all but couple of rules in plugin');
    t.end();
});

test('putout: loader: enable part of rule: async', async (t) => {
    const code = montag`
        const {Identifier} = types;
        Identifier('x');
    `;
    
    const {places} = await putoutAsync(code, {
        fix: false,
        rules: {
            'putout': 'off',
            'putout/apply-lowercase-to-node-builders': 'on',
        },
        plugins: ['putout'],
    });
    
    const expected = [{
        message: `Use lowercased node builders`,
        position: {
            column: 1,
            line: 2,
        },
        rule: 'putout/apply-lowercase-to-node-builders',
    }];
    
    t.deepEqual(places, expected, 'should disable all but couple of rules in plugin');
    t.end();
});

test('putout: loader: plugin name not string', async (t) => {
    const code = montag`
        const {Identifier} = types;
        Identifier('x');
    `;
    
    const [error] = await tryToCatch(putout, code, {
        fix: false,
        rules: {
            putout: 'on',
        },
        plugins: [
            [putout, 's'],
        ],
    });
    
    t.equal(error.message, `☝️ Looks like plugin name type is not 'string', but: 'function'`);
    t.end();
});

const createFindPath = (pluginName, findPath) => (name, paths) => {
    if (!name.indexOf(`@putout/plugin-${pluginName}`))
        return false;
    
    if (name === `putout-plugin-${pluginName}`)
        return false;
    
    return findPath(name, paths);
};
