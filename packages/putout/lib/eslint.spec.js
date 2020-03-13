'use strict';

const test = require('supertape');
const stub = require('@cloudcmd/stub');
const mockRequire = require('mock-require');
const tryCatch = require('try-catch');

const eslint = require('./eslint');

const {reRequire, stopAll} = mockRequire;
const {assign} = Object;

test('putout: eslint: places', (t) => {
    const [, result] = eslint({
        name: 'hello.js',
        code: `const t = 'hi'\n`,
        fix: false,
    });
    
    const expected = [{
        rule: 'eslint/semi',
        message: 'Missing semicolon.',
        position: {
            line: 1,
            column: 15,
        },
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: eslint: fix', (t) => {
    const [result] = eslint({
        name: 'hello.js',
        code: `const t = 'hi'\n`,
        fix: true,
    });
    
    const expected = `const t = 'hi';\n`;
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: eslint: fix: same', (t) => {
    const [result] = eslint({
        name: 'hello.js',
        code: `const t = 'hi';`,
        fix: false,
    });
    
    const expected = `const t = 'hi';`;
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: eslint: fix: cache', (t) => {
    const [result] = eslint({
        name: 'hello.js',
        code: `const t = 'hi'\n`,
        fix: true,
    });
    
    const expected = `const t = 'hi';\n`;
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: eslint: loadPlugin: namespace', (t) => {
    const {_loadPlugin} = eslint;
    
    const resolve = stub().returns('@babel/eslint-plugin-development');
    const require = assign(stub(), {
        resolve,
    });
    
    _loadPlugin('@babel/development', require);
    
    t.ok(require.calledWith('@babel/eslint-plugin-development'), 'should call require');
    t.end();
});

test('putout: eslint: loadPlugin', (t) => {
    const {_loadPlugin} = eslint;
    
    const resolve = stub().returns('eslint-plugin-putout');
    const require = assign(stub(), {
        resolve,
    });
    
    _loadPlugin('putout', require);
    
    t.ok(require.calledWith('eslint-plugin-putout'), 'should call require');
    t.end();
});

test('putout: eslint: no config error', (t) => {
    const {_noConfigFound} = eslint;
    
    const result = _noConfigFound(null, {
        messageTemplate: 'no-config-found',
    });
    
    t.ok(result, 'should not found config');
    t.end();
});

test('putout: eslint: no config', (t) => {
    const {_noConfigFound} = eslint;
    
    const config = {
        rules: {},
    };
    
    const result = _noConfigFound(config);
    
    t.ok(result, 'should not found config');
    t.end();
});

test('putout: eslint: parsing error', (t) => {
    const [, result] = eslint({
        name: 'hello.js',
        code: `const t`,
        fix: false,
    });
    
    const expected = [{
        rule: 'eslint/null',
        message: 'Parsing error: Unexpected token',
        position: {
            line: 1,
            column: 8,
        },
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: eslint: config error: plugin missing', (t) => {
    const _eslint = require('eslint');
    
    const getConfigForFile = () => {
        const error = Error('hello');
        error.messageTemplate = 'plugin-missing';
        error.messageData = {
            pluginName: 'zzz',
        };
        
        throw error;
    };
    
    const executeOnText = stub();
    const CLIEngine = stub().returns({
        getConfigForFile,
        executeOnText,
    });
    
    mockRequire('eslint', {
        ..._eslint,
        CLIEngine,
    });
    
    const eslint = reRequire('./eslint');
    
    const [, places] = eslint({
        name: 'hello.js',
        code: `const t`,
        fix: false,
    });
    
    const expected = [{
        rule: 'eslint/parser',
        message: 'Plugin missing: zzz',
        position: {
            line: 'x',
            column: 'x',
        },
    }];
    
    stopAll();
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: eslint: config error', (t) => {
    const _eslint = require('eslint');
    
    const getConfigForFile = () => {
        const error = Error('hello');
        error.messageTemplate = 'some error';
        error.messageData = {
            pluginName: 'zzz',
        };
        
        throw error;
    };
    
    const executeOnText = stub();
    const CLIEngine = stub().returns({
        getConfigForFile,
        executeOnText,
    });
    
    mockRequire('eslint', {
        ..._eslint,
        CLIEngine,
    });
    
    const eslint = reRequire('./eslint');
    
    const [, places] = eslint({
        name: 'hello.js',
        code: `const t`,
        fix: false,
    });
    
    const expected = [{
        rule: 'eslint/parser',
        message: 'hello',
        position: {
            line: 'x',
            column: 'x',
        },
    }];
    
    stopAll();
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: eslint: no config found', (t) => {
    const _eslint = require('eslint');
    
    const getConfigForFile = () => {
        const error = Error('hello');
        error.messageTemplate = 'no-config-found';
        error.messageData = {
            pluginName: 'zzz',
        };
        
        throw error;
    };
    
    const executeOnText = stub();
    const CLIEngine = stub().returns({
        getConfigForFile,
        executeOnText,
    });
    
    mockRequire('eslint', {
        ..._eslint,
        CLIEngine,
    });
    
    const eslint = reRequire('./eslint');
    
    const [, places] = eslint({
        name: 'hello.js',
        code: `const t`,
        fix: false,
    });
    
    stopAll();
    
    t.notOk(places.length);
    t.end();
});

test('putout: eslint: parser', (t) => {
    const _eslint = require('eslint');
    
    const getConfigForFile = stub().returns({
        parser: 'hello',
        rules: {
            hello: 'off',
        },
    });
    
    const executeOnText = stub();
    const CLIEngine = stub().returns({
        getConfigForFile,
        executeOnText,
    });
    
    mockRequire('eslint', {
        ..._eslint,
        CLIEngine,
    });
    
    const eslint = reRequire('./eslint');
    
    const [error] = tryCatch(eslint, {
        name: 'hello.js',
        code: `const t`,
        fix: true,
    });
    
    stopAll();
    
    t.ok(/^Cannot find module 'hello'/.test(error.message));
    t.end();
});

test('putout: eslint: no places', (t) => {
    const _eslint = require('eslint');
    
    const getConfigForFile = stub().returns({
        plugins: [],
        rules: {
            hello: 'off',
        },
    });
    
    const executeOnText = stub().returns({
        results: [],
    });
    
    const CLIEngine = stub().returns({
        getConfigForFile,
        executeOnText,
    });
    
    mockRequire('eslint', {
        ..._eslint,
        CLIEngine,
    });
    
    const eslint = reRequire('./eslint');
    
    const [, places] = eslint({
        name: 'hello.js',
        code: `var t = "hello"`,
        fix: false,
    });
    
    stopAll();
    
    t.notOk(places.length);
    t.end();
});
