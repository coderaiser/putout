'use strict';

const Module = require('module');
const test = require('supertape');
const stub = require('@cloudcmd/stub');
const tryCatch = require('try-catch');
const mockRequire = require('mock-require');
const putout = require('putout');
const montag = require('montag');

const {
    reRequire,
    stopAll,
} = mockRequire;

const {readFixtures} = require('./fixture');
const {loadPlugins} = require('..');

const fixture = readFixtures([
    'shebang',
    'shebang-fix',
    'babel-plugin',
    'babel-plugin-fix',
    'babel-plugin-namespace',
    'babel-plugin-namespace-fix',
    'jscodeshift',
    'jscodeshift-fix',
    'jscodeshift-arrow',
    'jscodeshift-arrow-fix',
    'jscodeshift-options',
    'jscodeshift-options-fix',
]);

test('putout: loader: user plugin', (t) => {
    const {_findPath} = Module;
    const rmVars = 'remove-unused-variables';
    
    const rmUnusedVars = require(`@putout/plugin-${rmVars}`);
    
    mockRequire(`@putout/plugin-${rmVars}`, null);
    mockRequire(`putout-plugin-${rmVars}`, rmUnusedVars);
    
    reRequire('..');
    const putout = reRequire('putout');
    
    Module._findPath = stub((name, paths) => {
        if (!name.indexOf(`@putout/plugin-${rmVars}`))
            return false;
        
        if (name === `putout-plugin-${rmVars}`) {
            return name;
        }
        
        return _findPath(name, paths);
    });
    
    const {code} = putout(`const t = 'hello'`, {
        loadPlugins,
        plugins: [
            rmVars,
        ],
    });
    
    mockRequire.stopAll();
    Module._findPath = _findPath;
    
    t.equal(code, '', 'should equal');
    t.end();
});

test('putout: loader: can not find', (t) => {
    const [e] = tryCatch(putout, `const t = 'hello'`, {
        plugins: [
            'xxx',
        ],
    });
    
    const expected = 'Plugin "putout-plugin-xxx" could not be found!';
    
    t.equal(e.message, expected, 'should equal');
    t.end();
});

test('putout: loader: function', (t) => {
    const rmVars = 'remove-unused-variables';
    const rmVarsPlugin = require(`@putout/plugin-${rmVars}`);
    
    mockRequire(`@putout/plugin-${rmVars}`, null);
    
    reRequire('..');
    const putout = reRequire('putout');
    
    const {code} = putout(`const t = 'hello'`, {
        plugins: [{
            [rmVars]: rmVarsPlugin,
        }],
    });
    
    stopAll();
    
    t.equal(code, '', 'should equal');
    t.end();
});

test('putout: loader: function: rules', (t) => {
    const rmVars = 'remove-unused-variables';
    const rmVarsPlugin = require(`@putout/plugin-${rmVars}`);
    
    mockRequire(`@putout/plugin-${rmVars}`, null);
    
    reRequire('..');
    const putout = reRequire('putout');
    
    const {code} = putout(`const t = 'hello'`, {
        plugins: [{
            'brand-new-rule': {
                rules: {
                    [rmVars]: rmVarsPlugin,
                },
            },
        }],
    });
    
    stopAll();
    
    t.equal(code, '', 'should equal');
    t.end();
});

test('putout: loader: disabled rule', (t) => {
    const rmVars = 'remove-unused-variables';
    const rmVarsPlugin = require(`@putout/plugin-${rmVars}`);
    
    mockRequire(`@putout/plugin-${rmVars}`, null);
    
    reRequire('..');
    const putout = reRequire('putout');
    
    const {code} = putout(`const t = 'hello'`, {
        rules: {
            [rmVars]: false,
        },
        plugins: [{
            [rmVars]: rmVarsPlugin,
        }],
    });
    
    stopAll();
    
    t.equal(code, `const t = 'hello'`, 'should equal');
    t.end();
});

test('putout: loader: plugins: array', (t) => {
    const rmVars = 'remove-unused-variables';
    const rmVarsPlugin = require(`@putout/plugin-${rmVars}`);
    
    mockRequire(`@putout/plugin-${rmVars}`, null);
    
    reRequire('..');
    const putout = reRequire('putout');
    
    const {code} = putout(`const t = 'hello'`, {
        rules: {
            [rmVars]: false,
        },
        plugins: [
            ['remove-unused-variables', rmVarsPlugin],
        ],
    });
    
    stopAll();
    
    t.equal(code, `const t = 'hello'`, 'should equal');
    t.end();
});

test('putout: loader: jscodeshift', (t) => {
    const {code} = putout(fixture.jscodeshift, {
        plugins: [
            'jscodeshift/async-await-codemod/async-await',
        ],
    });
    
    t.deepEqual(code, fixture.jscodeshiftFix);
    t.end();
});

test('putout: loader: jscodeshift: cache', (t) => {
    const options = {
        plugins: [
            'jscodeshift/async-await-codemod/async-await',
        ],
    };
    
    putout(fixture.jscodeshift, options);
    
    const {code} = putout(fixture.jscodeshift, options);
    
    t.deepEqual(code, fixture.jscodeshiftFix);
    t.end();
});

test('putout: loader: jscodeshift: no vars', (t) => {
    const {code} = putout(fixture.jscodeshiftArrow, {
        plugins: [
            'jscodeshift/js-codemod/transforms/arrow-function',
        ],
    });
    
    t.deepEqual(code, fixture.jscodeshiftArrowFix);
    t.end();
});

test('putout: loader: jscodeshift: messsage', (t) => {
    const {places} = putout(fixture.jscodeshift, {
        loadPlugins,
        fix: false,
        plugins: [
            'jscodeshift/async-await-codemod/async-await',
        ],
    });
    
    const expected = [{
        message: 'async await codemod/async await',
        position: {
            column: 0,
            line: 2,
        },
        rule: 'jscodeshift/async-await-codemod/async-await',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: loader: babelPlugins', (t) => {
    const {code} = putout(fixture.babelPlugin, {
        plugins: [
            'babel/transform-inline-consecutive-adds',
        ],
    });
    
    t.deepEqual(code, fixture.babelPluginFix);
    t.end();
});

test('putout: loader: babelPlugins: namespace', (t) => {
    const {code} = putout(fixture.babelPluginNamespace, {
        loadPlugins,
        plugins: [
            'babel/codemod-object-assign-to-object-spread',
        ],
    });
    
    t.deepEqual(code, fixture.babelPluginNamespaceFix);
    t.end();
});

test('putout: loader: babelPlugins: espree', (t) => {
    const {code} = putout(fixture.babelPlugin, {
        parser: 'espree',
        plugins: [
            'babel/transform-inline-consecutive-adds',
        ],
    });
    
    t.deepEqual(code, fixture.babelPluginFix);
    t.end();
});

test('putout: loader: babelPlugins: espree: shebang', (t) => {
    const {code} = putout(fixture.shebang, {
        parser: 'espree',
        plugins: [
            'remove-unused-variables',
            'babel/transform-inline-consecutive-adds',
        ],
    });
    
    t.deepEqual(code, fixture.shebangFix);
    t.end();
});

test('putout: loader: babelPlugins: position: shebang', (t) => {
    const {places} = putout(fixture.babelPlugin, {
        fix: false,
        plugins: [
            'babel/transform-inline-consecutive-adds',
        ],
    });
    
    const expected = [{
        rule: 'babel/transform-inline-consecutive-adds',
        message: 'transform inline consecutive adds',
        position: {
            line: 4,
            column: 0,
        },
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: loader: babelPlugins: custom message', (t) => {
    const message = 'hello world';
    const enabled = true;
    const {places} = putout(fixture.babelPlugin, {
        fix: false,
        rules: {
            'babel/transform-inline-consecutive-adds': [enabled, message],
        },
        plugins: [
            'babel/transform-inline-consecutive-adds',
        ],
    });
    
    const expected = [{
        rule: 'babel/transform-inline-consecutive-adds',
        message,
        position: {
            line: 4,
            column: 0,
        },
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: loader: babelPlugins: custom message: on', (t) => {
    const message = 'hello world';
    const enabled = 'on';
    const {places} = putout(fixture.babelPlugin, {
        fix: false,
        rules: {
            'babel/transform-inline-consecutive-adds': [enabled, message],
        },
        plugins: [
            'babel/transform-inline-consecutive-adds',
        ],
    });
    
    const expected = [{
        rule: 'babel/transform-inline-consecutive-adds',
        message,
        position: {
            line: 4,
            column: 0,
        },
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: loader: babelPlugins: no message: first options', (t) => {
    const message = 'transform inline consecutive adds';
    const {places} = putout(fixture.babelPlugin, {
        fix: false,
        rules: {
            'babel/transform-inline-consecutive-adds': [{}],
        },
        plugins: [
            'babel/transform-inline-consecutive-adds',
        ],
    });
    
    const expected = [{
        rule: 'babel/transform-inline-consecutive-adds',
        message,
        position: {
            line: 4,
            column: 0,
        },
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: loader: babelPlugins: shebang', (t) => {
    const {code} = putout(fixture.shebang, {
        plugins: [
            'babel/transform-inline-consecutive-adds',
        ],
    });
    
    t.deepEqual(code, fixture.shebang);
    t.end();
});

test('putout: loader: nested rules', (t) => {
    const {code} = putout(fixture.shebang, {
        rules: {
            'putout/convert-babel-types': 'off',
            'remove-unused-variables': 'off',
        },
        plugins: [
            'remove-unused-variables',
            'putout',
        ],
    });
    
    t.deepEqual(code, fixture.shebang);
    t.end();
});

test('putout: loader: no plugin for a rule', (t) => {
    const [e] = tryCatch(putout, 'hello', {
        rules: {
            abcd: 'off',
        },
        plugins: [
        ],
    });
    
    t.equal(e.message, 'no plugin found for a rule: "abcd"');
    t.end();
});

test('putout: loader: nested rule: one', (t) => {
    const [e] = tryCatch(putout, 'hello', {
        rules: {
            'putout/convert-babel-types': 'off',
        },
        plugins: [
            'putout',
        ],
    });
    
    t.notOk(e);
    t.end();
});

test('putout: loader: nested rule: babel', (t) => {
    const [e] = tryCatch(putout, 'hello', {
        rules: {
            'babel/convert': 'off',
        },
        plugins: [
            'babel/convert',
        ],
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

test('putout: loader: enable part of rule', (t) => {
    const source = `const {run} = require('madrun');`;
    
    const {code} = putout(source, {
        fix: true,
        rules: {
            'convert-commonjs-to-esm': 'off',
            'convert-commonjs-to-esm/require': 'on',
        },
        plugins: [
            'convert-commonjs-to-esm',
        ],
    });
    
    const expected = `import {run} from 'madrun';`;
    
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
        plugins: [
            'madrun',
        ],
    });
    
    const expected = [{
        message: '"lint" should check current directory',
        position: {
            column: 17,
            line: 3,
        },
        rule: 'madrun/set-lint-dot',
    }];
    
    t.deepEqual(places, expected, 'should disable one of rules in plugin');
    t.end();
});

test('putout: loader: plugin is a function', (t) => {
    const [e] = tryCatch(putout, 'hello', {
        loadPlugins,
        plugins: [
            ['fn', () => {}],
        ],
    });
    
    t.equal(e.message, `Plugin "fn" type cannot be determined. Supported plugin types: https://git.io/JqcMn`);
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
