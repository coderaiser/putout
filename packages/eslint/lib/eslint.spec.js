'use strict';

const {join} = require('node:path');
const process = require('node:process');
const mockRequire = require('mock-require');

const {test, stub} = require('supertape');
const eslint = require('./eslint.js');

const {reRequire, stopAll} = mockRequire;

test('putout: eslint: places', async (t) => {
    const [, result] = await eslint({
        name: join(__dirname, 'hello.js'),
        code: `const t = 'hi'\n`,
        fix: false,
    });
    
    const expected = [{
        rule: '@stylistic/js/semi (eslint)',
        message: 'Missing semicolon.',
        position: {
            line: 1,
            column: 15,
        },
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: eslint: places: success', async (t) => {
    const [, result] = await eslint({
        name: join(__dirname, '<input>'),
        code: `const t = 'hi';\n`,
        fix: false,
    });
    
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: eslint: no eslint', async (t) => {
    const simpleImport = stub().rejects(Error(''));
    
    mockRequire('./simple-import', {
        simpleImport,
    });
    
    const eslint = reRequire('./eslint.js');
    
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

test('putout: eslint: fix', async (t) => {
    const [result] = await eslint({
        name: join(__dirname, 'hello.js'),
        code: `const t = 'hi'\n`,
        fix: true,
    });
    
    const expected = `const t = 'hi';\n`;
    
    t.equal(result, expected);
    t.end();
});

test('putout: eslint: fix: same', async (t) => {
    const [result] = await eslint({
        name: 'hello.js',
        code: `const t = 'hi';`,
        fix: false,
    });
    
    const expected = `const t = 'hi';`;
    
    t.equal(result, expected);
    t.end();
});

test('putout: eslint: fix: cache', async (t) => {
    const [result] = await eslint({
        name: join(__dirname, 'hello.js'),
        code: `const t = 'hi'\n`,
        fix: true,
    });
    
    const expected = `const t = 'hi';\n`;
    
    t.equal(result, expected);
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

test('putout: eslint: ignored file: no rules', (t) => {
    const {_noConfigFound} = reRequire('./eslint');
    
    const result = _noConfigFound({});
    
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
        rule: 'parser (eslint)',
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
    const calculateConfigForFile = async () => {
        const error = Error('hello');
        
        error.messageTemplate = 'plugin-missing';
        error.messageData = {
            pluginName: 'zzz',
        };
        
        throw error;
    };
    
    const lintText = stub();
    
    const ESLint = {
        calculateConfigForFile,
        lintText,
    };
    
    const getESLint = stub().returns(ESLint);
    
    mockRequire('./simple-import.js', {
        simpleImport: stub().returns({
            getESLint,
        }),
    });
    
    const eslint = reRequire('./eslint');
    
    const [, places] = await eslint({
        name: 'hello.js',
        code: `const t`,
        fix: false,
    });
    
    const expected = [{
        rule: 'parser (eslint)',
        message: 'Plugin missing: zzz',
        position: {
            line: 0,
            column: 0,
        },
    }];
    
    stopAll();
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: eslint: config error: no config found', async (t) => {
    const calculateConfigForFile = async () => {
        const error = Error('hello');
        
        error.messageTemplate = 'no-config-found';
        error.messageData = {
            pluginName: 'zzz',
        };
        
        throw error;
    };
    
    const lintText = stub();
    
    const ESLint = {
        calculateConfigForFile,
        lintText,
    };
    
    const getESLint = stub().returns(ESLint);
    
    mockRequire('./simple-import.js', {
        simpleImport: stub().returns({
            getESLint,
        }),
    });
    
    const eslint = reRequire('./eslint');
    
    const [, places] = await eslint({
        name: 'hello.js',
        code: `const t`,
        fix: false,
    });
    
    const expected = [];
    
    stopAll();
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: eslint: config error', async (t) => {
    const calculateConfigForFile = async () => {
        const error = Error('hello');
        
        error.messageTemplate = 'some error';
        error.messageData = {
            pluginName: 'zzz',
        };
        
        throw error;
    };
    
    const lintText = stub();
    
    const ESLint = {
        calculateConfigForFile,
        lintText,
    };
    
    const getESLint = stub().returns(ESLint);
    
    mockRequire('./simple-import.js', {
        simpleImport: stub().returns({
            getESLint,
        }),
    });
    
    const eslint = reRequire('./eslint');
    
    const [, places] = await eslint({
        name: 'hello.js',
        code: `const t`,
        fix: false,
    });
    
    const expected = [{
        rule: 'parser (eslint)',
        message: 'hello',
        position: {
            line: 0,
            column: 0,
        },
    }];
    
    stopAll();
    
    t.deepEqual(places, expected);
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
    
    t.equal(source, 'const a = 1;\n');
    t.end();
});

test('putout: eslint: output: config', async (t) => {
    const config = {
        rules: {
            '@stylistic/js/semi': 'off',
        },
    };
    
    const [source] = await eslint({
        name: 'hello.js',
        code: `var a = 1`,
        fix: true,
        config,
    });
    
    t.equal(source, 'const a = 1\n');
    t.end();
});

test('putout: eslint: enable putout', async (t) => {
    const config = {
        rules: {
            semi: 'off',
        },
    };
    
    const [source] = await eslint({
        name: join(__dirname, 'hello.js'),
        code: `var a = 1; module.exports = a`,
        fix: true,
        putout: true,
        config,
    });
    
    t.equal(source, `'use strict';\n\nmodule.exports = 1;\n\n`);
    t.end();
});

test('putout: eslint: convertToPlace: control sequences', async (t) => {
    const result = await eslint.convertToPlace({
        ruleId: '@typescript-eslint/naming-convention',
        message: 'Object Literal Property name `\u001a` must match one of the following formats: camelCase, UPPER_CASE',
        line: 281,
        column: 26,
    });
    
    const expected = {
        rule: '@typescript-eslint/naming-convention (eslint)',
        message: 'Object Literal Property name `. ` must match one of the following formats: camelCase, UPPER_CASE',
        position: {
            line: 281,
            column: 26,
        },
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: eslint: get-eslint: config file', async (t) => {
    process.env.ESLINT_CONFIG_FILE = 'abcdef.js';
    
    const eslint = reRequire('./eslint.js');
    
    const [, places] = await eslint({
        name: 'hello.js',
        code: `const t = 'hi'\n`,
        fix: false,
    });
    
    const [place] = places;
    const {message} = place;
    
    delete process.env.ESLINT_CONFIG_FILE;
    
    reRequire('./eslint.js');
    
    t.match(message, /^Cannot read config file/);
    t.end();
});

test('putout: eslint: convert places', async (t) => {
    const WARNING = 1;
    const calculateConfigForFile = stub().resolves({
        rules: {
            'no-unused-vars': 'error',
        },
    });
    
    const lintText = stub().resolves([{
        messages: [{
            ruleId: 'no-unused-vars',
            message: `'t' is declared but never used.`,
            line: 1,
            column: 1,
            severity: WARNING,
        }],
    }]);
    
    const ESLint = {
        calculateConfigForFile,
        lintText,
    };
    
    const getESLint = stub().returns(ESLint);
    
    mockRequire('./simple-import.js', {
        simpleImport: stub().returns({
            getESLint,
        }),
    });
    
    const eslint = reRequire('./eslint');
    
    const [, places] = await eslint({
        name: 'hello.js',
        code: `const t = 5`,
        fix: false,
    });
    
    const expected = [{
        message: `'t' is declared but never used.`,
        position: {
            column: 1,
            line: 1,
        },
        rule: 'no-unused-vars (eslint)',
    }];
    
    stopAll();
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: eslint: config: remove putout', async (t) => {
    const calculateConfigForFile = stub().resolves({
        rules: {
            semi: 'off',
        },
    });
    
    const lintText = stub().resolves([]);
    
    const ESLint = {
        calculateConfigForFile,
        lintText,
    };
    
    const getESLint = stub().returns(ESLint);
    
    mockRequire('./simple-import.js', {
        simpleImport: stub().returns({
            getESLint,
        }),
    });
    
    const eslint = reRequire('./eslint');
    
    const [, places] = await eslint({
        name: 'hello.js',
        code: `const t = 5`,
        fix: false,
    });
    
    const expected = [];
    
    stopAll();
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: eslint: NO_ESLINT_WARNINGS', async (t) => {
    const WARNING = 1;
    const calculateConfigForFile = stub().resolves({
        rules: {
            'no-unused-vars': 'error',
        },
    });
    
    const lintText = stub().resolves([{
        messages: [{
            ruleId: 'no-unused-vars',
            message: `'t' is declared but never used.`,
            line: 1,
            column: 1,
            severity: WARNING,
        }],
    }]);
    
    const ESLint = {
        calculateConfigForFile,
        lintText,
    };
    
    const getESLint = stub().returns(ESLint);
    
    mockRequire('./simple-import.js', {
        simpleImport: stub().returns({
            getESLint,
        }),
    });
    
    process.env.NO_ESLINT_WARNINGS = '1';
    
    const eslint = reRequire('./eslint');
    
    const [, places] = await eslint({
        name: 'hello.js',
        code: `const t = 5`,
        fix: false,
    });
    
    const expected = [];
    
    delete process.env.NO_ESLINT_WARNINGS;
    
    stopAll();
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: eslint: NO_ESLINT', async (t) => {
    process.env.NO_ESLINT = '1';
    
    const eslint = reRequire('./eslint.js');
    const [, places] = await eslint({
        name: 'hello.js',
        code: `const t = 'hi'\n`,
        fix: false,
    });
    
    delete process.env.NO_ESLINT;
    
    reRequire('./eslint.js');
    
    t.notOk(places.length);
    t.end();
});

test('putout: eslint: config: no FlatConfig found', async (t) => {
    const calculateConfigForFile = stub().rejects(Error('Could not find config file.'));
    const lintText = stub().resolves([]);
    
    const ESLint = {
        calculateConfigForFile,
        lintText,
    };
    
    const getESLint = stub().returns(ESLint);
    
    mockRequire('./simple-import.js', {
        simpleImport: stub().returns({
            getESLint,
        }),
    });
    
    const eslint = reRequire('./eslint');
    
    const [, places] = await eslint({
        name: 'hello.js',
        code: `const t = 5`,
        fix: false,
    });
    
    const expected = [];
    
    stopAll();
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: eslint: ignored: no async', async (t) => {
    const [, places] = await eslint({
        name: 'hello.js',
        code: `function hello() {await world();}`,
        fix: false,
    });
    
    t.notOk(places.length);
    t.end();
});

test('putout: eslint: ignored: no star', async (t) => {
    const [, places] = await eslint({
        name: __filename,
        code: `function hello() {yield 1;}`,
        fix: false,
    });
    
    t.notOk(places.length);
    t.end();
});
