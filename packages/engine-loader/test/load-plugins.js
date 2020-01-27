'use strict';

const Module = require('module');
const test = require('supertape');
const stub = require('@cloudcmd/stub');
const tryCatch = require('try-catch');
const mockRequire = require('mock-require');
const {
    reRequire,
    stopAll,
} = mockRequire;

const {readFixtures} = require('./fixture');

const fixture = readFixtures([
    'shebang',
    'shebang-fix',
    'babel-plugins',
    'babel-plugins-fix',
    'jscodeshift',
    'jscodeshift-fix',
    'jscodeshift-arrow',
    'jscodeshift-arrow-fix',
    'jscodeshift-options',
    'jscodeshift-options-fix',
]);

const putout = require('putout');
const {loadPlugins} = require('..');

test('load-plugins: user plugin', (t) => {
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

test('load-plugins: browser build with bundled plugins', (t) => {
    const {plugins} = Module;
    Module.plugins = {
        abc: stub(),
    };
    
    const [e] = tryCatch(putout, `const t = 'hello'`, {
        plugins: [
            'abc',
        ],
    });
    
    Module.plugins = plugins;
    
    t.notOk(e, 'should find plugin in Module.plugins');
    t.end();
});

test('load-plugins: can not find', (t) => {
    const [e] = tryCatch(putout, `const t = 'hello'`, {
        plugins: [
            'xxx',
        ],
    });
    
    const expected = 'Plugin "putout-plugin-xxx could not be found!';
    
    t.equal(e.message, expected, 'should equal');
    t.end();
});

test('load-plugins: function', (t) => {
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

test('load-plugins: function: rules', (t) => {
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

test('load-plugins: function', (t) => {
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

test('load-plugins: function', (t) => {
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

test('load-plugins: disabled rule', (t) => {
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

test('putout: jscodeshift', (t) => {
    const {code} = putout(fixture.jscodeshift, {
        plugins: [
            'jscodeshift/async-await-codemod/async-await',
        ],
    });
    
    t.deepEqual(code, fixture.jscodeshiftFix);
    t.end();
});

test('putout: jscodeshift: no vars', (t) => {
    const {code} = putout(fixture.jscodeshiftArrow, {
        plugins: [
            'jscodeshift/js-codemod/transforms/arrow-function',
        ],
    });
    
    t.deepEqual(code, fixture.jscodeshiftArrowFix);
    t.end();
});

test('putout: jscodeshift: messsage', (t) => {
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

test('putout: babelPlugins', (t) => {
    const {code} = putout(fixture.babelPlugins, {
        plugins: [
            'babel/transform-inline-consecutive-adds',
        ],
    });
    
    t.deepEqual(code, fixture.babelPluginsFix);
    t.end();
});

test('putout: babelPlugins: espree', (t) => {
    const {code} = putout(fixture.babelPlugins, {
        parser: 'espree',
        plugins: [
            'babel/transform-inline-consecutive-adds',
        ],
    });
    
    t.deepEqual(code, fixture.babelPluginsFix);
    t.end();
});

test('putout: babelPlugins: espree: shebang', (t) => {
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

test('putout: babelPlugins: position: shebang', (t) => {
    const {places} = putout(fixture.babelPlugins, {
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

test('putout: babelPlugins: custom message', (t) => {
    const message = 'hello world';
    const enabled = true;
    const {places} = putout(fixture.babelPlugins, {
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

test('putout: babelPlugins: no message: first options', (t) => {
    const message = 'transform inline consecutive adds';
    const {places} = putout(fixture.babelPlugins, {
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

test('putout: babelPlugins: shebang', (t) => {
    const {code} = putout(fixture.shebang, {
        plugins: [
            'babel/transform-inline-consecutive-adds',
        ],
    });
    
    t.deepEqual(code, fixture.shebang);
    t.end();
});

test('putout: nested rules', (t) => {
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

test('putout: no plugin for a rule', (t) => {
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

test('putout: nested rule', (t) => {
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

test('putout: nested rule', (t) => {
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

