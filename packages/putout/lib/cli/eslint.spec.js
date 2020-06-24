'use strict';

const test = require('supertape');
const stub = require('@cloudcmd/stub');
const mockRequire = require('mock-require');

const eslint = require('./eslint');

const {reRequire, stopAll} = mockRequire;

test('putout: eslint: places', async (t) => {
    const [, result] = await eslint({
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

test('putout: eslint: no eslint', async (t) => {
    mockRequire('eslint', null);
    
    const eslint = reRequire('./eslint');
    
    const [, result] = await eslint({
        name: 'hello.js',
        code: `const t = 'hi'\n`,
        fix: false,
    });
    
    stopAll();
    
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: eslint: config file', async (t) => {
    const {ESLINT_CONFIG_FILE} = process.env;
    
    process.env.ESLINT_CONFIG_FILE = 'hello.js';
    
    const eslint = reRequire('./eslint');
    const [, places] = await eslint({
        name: 'hello.js',
        code: `const t = 'hi'\n`,
        fix: false,
    });
    
    const [place] = places;
    const {message} = place;
    
    process.env.ESLINT_CONFIG_FILE = ESLINT_CONFIG_FILE;
    
    stopAll();
    
    t.ok(/^Cannot read config file/.test(message));
    t.end();
});

test('putout: eslint: fix', async (t) => {
    const eslint = reRequire('./eslint');
    
    const [result] = await eslint({
        name: 'hello.js',
        code: `const t = 'hi'\n`,
        fix: true,
    });
    
    const expected = `const t = 'hi'\n`;
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: eslint: fix: same', async (t) => {
    const [result] = await eslint({
        name: 'hello.js',
        code: `const t = 'hi';`,
        fix: false,
    });
    
    const expected = `const t = 'hi';`;
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: eslint: fix: cache', async (t) => {
    const [result] = await eslint({
        name: 'hello.js',
        code: `const t = 'hi'\n`,
        fix: true,
    });
    
    const expected = `const t = 'hi'\n`;
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: eslint: no config error', (t) => {
    const {_noConfigFound} = reRequire('./eslint');
    
    const result = _noConfigFound(null, {
        messageTemplate: 'no-config-found',
    });
    
    t.ok(result, 'should not found config');
    t.end();
});

test('putout: eslint: no config', (t) => {
    const {_noConfigFound} = reRequire('./eslint');
    
    const config = {
        rules: {},
    };
    
    const result = _noConfigFound(config);
    
    t.ok(result, 'should not found config');
    t.end();
});

test('putout: eslint: parsing error', async (t) => {
    const [, result] = await eslint({
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

test('putout: eslint: config error: plugin missing', async (t) => {
    const _eslint = require('eslint');
    
    const calculateConfigForFile = async () => {
        const error = Error('hello');
        error.messageTemplate = 'plugin-missing';
        error.messageData = {
            pluginName: 'zzz',
        };
        
        throw error;
    };
    
    const lintText = stub();
    const ESLint = stub().returns({
        calculateConfigForFile,
        lintText,
    });
    
    mockRequire('eslint', {
        ..._eslint,
        ESLint,
    });
    
    const eslint = reRequire('./eslint');
    
    const [, places] = await eslint({
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

test('putout: eslint: config error', async (t) => {
    const _eslint = require('eslint');
    
    const calculateConfigForFile = async () => {
        const error = Error('hello');
        error.messageTemplate = 'some error';
        error.messageData = {
            pluginName: 'zzz',
        };
        
        throw error;
    };
    
    const lintText = stub();
    const ESLint = stub().returns({
        calculateConfigForFile,
        lintText,
    });
    
    mockRequire('eslint', {
        ..._eslint,
        ESLint,
    });
    
    const eslint = reRequire('./eslint');
    
    const [, places] = await eslint({
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

test('putout: eslint: no config found', async (t) => {
    const _eslint = require('eslint');
    
    const calculateConfigForFile = async () => {
        const error = Error('hello');
        
        error.messageTemplate = 'no-config-found';
        error.messageData = {
            pluginName: 'zzz',
        };
        
        throw error;
    };
    
    const lintText = stub();
    const ESLint = stub().returns({
        calculateConfigForFile,
        lintText,
    });
    
    mockRequire('eslint', {
        ..._eslint,
        ESLint,
    });
    
    const eslint = reRequire('./eslint');
    
    const [, places] = await eslint({
        name: 'hello.js',
        code: `const t`,
        fix: false,
    });
    
    stopAll();
    
    t.notOk(places.length);
    t.end();
});

test('putout: eslint: config: putout', async (t) => {
    const _eslint = require('eslint');
    
    const calculateConfigForFile = async () => {
        return {
            rules: {
                'putout/remove-unused-variabls': 'error',
            },
        };
    };
    
    const lintText = stub().returns([]);
    const ESLint = stub().returns({
        calculateConfigForFile,
        lintText,
    });
    
    mockRequire('eslint', {
        ..._eslint,
        ESLint,
    });
    
    const eslint = reRequire('./eslint');
    
    const [, places] = await eslint({
        name: 'hello.js',
        code: `const t`,
        fix: false,
    });
    
    stopAll();
    
    t.notOk(places.length);
    t.end();
});

test('putout: eslint: parser', async (t) => {
    const [, places] = await eslint({
        name: 'hello.js',
        code: `const t`,
        fix: true,
    });
    
    const {message} = places[0];
    
    t.equal(message, 'Parsing error: Unexpected token');
    t.end();
});

test('putout: eslint: output', async (t) => {
    const [source] = await eslint({
        name: 'hello.js',
        code: `const a = 1;`,
        fix: true,
    });
    
    t.equal(source, 'const a = 1;');
    t.end();
});

