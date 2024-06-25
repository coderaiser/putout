'use strict';

const montag = require('montag');
const {test, stub} = require('supertape');
const mockRequire = require('mock-require');
const processFile = require('./process-file');
const parseOptions = require('../parse-options');
const noop = () => {};
const {reRequire, stopAll} = mockRequire;
const {stringify} = JSON;

test('putout: cli: process-file: eslint', async (t) => {
    const eslint = stub().returns(['', []]);
    
    const source = 'log123("hello")';
    const fix = false;
    const name = 'example.js';
    const log = stub();
    const write = stub();
    
    mockRequire('@putout/eslint', eslint);
    
    const options = {
        dir: '.',
    };
    
    const processFile = reRequire('./process-file');
    
    const fn = processFile({
        fix,
        log,
        write,
    });
    
    await fn({
        name: 'example.js',
        source,
        index: 0,
        length: 1,
        options,
    });
    
    stopAll();
    
    const expected = {
        code: source,
        fix,
        name,
    };
    
    t.calledWith(eslint, [expected], 'should call eslint');
    t.end();
});

test('putout: cli: process-file: ts from preProcessor', async (t) => {
    const eslint = stub().returns(['', []]);
    
    const source = 'const x: number = 3';
    const fix = false;
    const name = 'example.md{ts}';
    const log = stub();
    const write = stub();
    
    mockRequire('@putout/eslint', eslint);
    
    const options = {
        dir: '.',
    };
    
    const processFile = reRequire('./process-file');
    
    const fn = processFile({
        fix,
        log,
        write,
    });
    
    await fn({
        name,
        source,
        index: 0,
        length: 1,
        options,
    });
    
    stopAll();
    
    const expected = {
        code: source,
        fix,
        name,
    };
    
    t.calledWith(eslint, [expected], 'should call eslint');
    t.end();
});

test('putout: cli: process-file: tsx from preProcessor', async (t) => {
    const source = 'const x: number = <hello></hello>;';
    const fix = false;
    const name = 'example.md{tsx}';
    const log = stub();
    const write = stub();
    
    const options = {
        dir: '.',
    };
    
    const processFile = reRequire('./process-file');
    
    const fn = processFile({
        fix,
        log,
        write,
    });
    
    const {places} = await fn({
        name,
        source,
        index: 0,
        length: 1,
        options,
    });
    
    t.deepEqual(places, []);
    t.end();
});

test('putout: cli: process-file: options for inner data', async (t) => {
    const source = `__putout_processor_json(${stringify({
        rules: {
            'putout-config': true,
        },
    })})`;
    
    const fix = false;
    const name = 'example.md{json}';
    const log = stub();
    const write = stub();
    const eslint = stub().returns(['', []]);
    
    const options = {
        dir: '.',
        match: {
            '*.md{json}': {
                'putout-config': 'on',
            },
        },
        rules: {
            'putout-config': 'off',
        },
        plugins: ['putout-config'],
    };
    
    mockRequire('@putout/eslint', eslint);
    
    const processFile = reRequire('./process-file');
    
    const fn = processFile({
        fix,
        log,
        write,
    });
    
    const {places} = await fn({
        name,
        source,
        index: 0,
        length: 1,
        options,
    });
    
    stopAll();
    
    const expected = [{
        message: `Use 'String (on/off)' instead of 'Boolean (true/false)'`,
        position: {
            column: 50,
            line: 2,
        },
        rule: 'putout-config/convert-boolean-to-string',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: cli: process-file: ruler', async (t) => {
    const source = `__putout_processor_json(${stringify({
        rules: {
            'putout-config': true,
        },
    })})`.replace(/"/g, `'`);
    
    const fix = false;
    const name = 'example.md{json}';
    const log = stub();
    const write = stub();
    
    const eslint = stub().returns(['', [{
        message: 'Missing semicolon.',
        position: {
            column: 58,
            line: 2,
        },
        rule: 'semi (eslint)',
    }]]);
    
    const options = {
        dir: '.',
        match: {
            '*.md{json}': {
                'putout-config': 'on',
            },
        },
        rules: {
            'putout-config': 'off',
        },
        plugins: ['putout-config'],
    };
    
    mockRequire('@putout/eslint', eslint);
    
    const ruler = {
        enableAll: true,
    };
    
    const processFile = reRequire('./process-file');
    
    const fn = processFile({
        fix,
        log,
        write,
        ruler,
    });
    
    const {places} = await fn({
        name,
        source,
        index: 0,
        length: 1,
        options,
    });
    
    stopAll();
    
    const expected = [{
        message: `Use 'String (on/off)' instead of 'Boolean (true/false)'`,
        position: {
            column: 50,
            line: 2,
        },
        rule: 'putout-config/convert-boolean-to-string',
    }, {
        message: 'Missing semicolon.',
        position: {
            column: 58,
            line: 3,
        },
        rule: 'semi (eslint)',
    }];
    
    t.deepEqual(places, expected);
    t.end();
});

test('putout: cli: process-file: configurePrinter', async (t) => {
    const putoutAsync = stub().returns({
        code: '',
        places: [],
    });
    
    const source = 'log123("hello")';
    const fix = false;
    
    const log = stub();
    const write = stub();
    
    mockRequire('../putout.js', {
        putoutAsync,
    });
    
    const options = {
        dir: '.',
    };
    
    const processFile = reRequire('./process-file');
    
    const fn = processFile({
        fix,
        log,
        write,
    });
    
    await fn({
        options,
        name: 'example.md{js}',
        
        index: 0,
        length: 1,
        
        source,
    });
    
    stopAll();
    
    const expected = ['log123("hello")', {
        dir: '.',
        fix: false,
        fixCount: undefined,
        isFlow: undefined,
        isTS: false,
        printer: ['putout', {
            format: {
                endOfFile: '',
            },
        }],
    }];
    
    t.calledWith(putoutAsync, expected, 'should call configurePrinter');
    t.end();
});

test('putout: cli: process-file: plugin not found', async (t) => {
    const error = Error(`Cannot find package 'putout-plugin-travis'`);
    
    error.code = 'ERR_MODULE_NOT_FOUND';
    
    const putoutAsync = stub().throws(error);
    
    const source = '__putout_processor_yaml({"hello": "world"})';
    const fix = true;
    
    const log = stub();
    const write = stub();
    
    mockRequire('../putout.js', {
        putoutAsync,
    });
    
    const options = {
        dir: '.',
    };
    
    const processFile = reRequire('./process-file');
    
    const fn = processFile({
        fix,
        log,
        write,
    });
    
    const result = await fn({
        options,
        name: 'example.md{js}',
        
        index: 0,
        length: 1,
        
        source,
    });
    
    stopAll();
    
    const expected = {
        code: montag`
            __putout_processor_yaml({
                hello: 'world',
            });
        `,
        places: [{
            message: `Cannot find package 'putout-plugin-travis'`,
            position: {
                column: 1,
                line: 2,
            },
            rule: 'parser',
        }],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: process-file: quick-lint', async (t) => {
    const source = 'function hello() => {return x}';
    const fix = false;
    
    const log = stub();
    const write = stub();
    
    const options = {
        dir: '.',
    };
    
    const fn = processFile({
        fix,
        log,
        write,
    });
    
    const result = await fn({
        name: 'example.js',
        source,
        index: 0,
        length: 1,
        options,
    });
    
    const expected = {
        code: source,
        places: [{
            message: `functions/methods should not have '=>'`,
            position: {
                column: 17,
                line: 1,
            },
            rule: 'parser (quick-lint-js)',
        }],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: process-file: goldstein', async (t) => {
    const source = 'function hello () => {return x}';
    const fix = true;
    
    const log = stub();
    const write = stub();
    
    const options = {
        dir: '.',
    };
    
    const fn = processFile({
        fix,
        log,
        write,
    });
    
    const result = await fn({
        name: 'example.js',
        source,
        index: 0,
        length: 1,
        options,
    });
    
    const expected = {
        places: [{
            message: `'x' is not defined.`,
            position: {
                column: 12,
                line: 3,
            },
            rule: 'no-undef (eslint)',
        }],
        code: montag`
            function hello() {
                return x;
            }\n
        `,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: process-file: goldstein: no braces', async (t) => {
    const source = 'if a > 2 {}';
    const fix = true;
    
    const log = stub();
    const write = stub();
    
    const options = {
        dir: '.',
    };
    
    const fn = processFile({
        fix,
        log,
        write,
    });
    
    const result = await fn({
        name: 'example.js',
        source,
        index: 0,
        length: 1,
        options,
    });
    
    const expected = {
        code: 'if (a > 2) {}\n',
        places: [{
            message: `'a' is not defined.`,
            position: {
                column: 5,
                line: 2,
            },
            rule: 'no-undef (eslint)',
        }, {
            message: 'Empty block statement.',
            position: {
                column: 12,
                line: 2,
            },
            rule: 'no-empty (eslint)',
        }],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: process-file: syntax error', async (t) => {
    const source = 'CloudCmd({{ config }});';
    const fix = true;
    
    const log = stub();
    const write = stub();
    
    const options = {
        dir: '.',
    };
    
    const fn = processFile({
        fix,
        log,
        write,
    });
    
    const result = await fn({
        name: 'example.js',
        source,
        index: 0,
        length: 1,
        options,
    });
    
    const expected = {
        code: 'CloudCmd({{ config }});',
        places: [{
            message: 'Unexpected token',
            position: {
                column: 10,
                line: 2,
            },
            rule: 'parser',
        }, {
            message: 'Parsing error: Unexpected token {',
            position: {
                column: 11,
                line: 2,
            },
            rule: 'parser (eslint)',
        }],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: process-file: await without async: ESLint', async (t) => {
    const source = '() => await x';
    const fix = true;
    
    const log = stub();
    const write = stub();
    
    const options = {
        dir: '.',
    };
    
    const fn = processFile({
        fix,
        log,
        write,
    });
    
    const result = await fn({
        name: 'example.js',
        source,
        index: 0,
        length: 1,
        options,
    });
    
    const expected = {
        code: '() => await x;\n',
        places: [],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: process-file: after fixing syntax errors, run 🐊 and ESLint', async (t) => {
    const source = montag`
        function f() => {
            return 'x';
            var s;
        }
        
        f();
    `;
    
    const fix = true;
    
    const log = stub();
    const write = stub();
    
    const options = parseOptions(__filename);
    
    const fn = processFile({
        fix,
        log,
        write,
    });
    
    const result = await fn({
        name: __filename,
        source,
        index: 0,
        length: 1,
        options,
    });
    
    const expected = {
        code: montag`
            function f() {
                return 'x';
            }
            
            f();\n
        `,
        places: [],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: process-file: recursion: infinite loop', async (t) => {
    const source = montag`
        function f() => {
            return 'x';
            var s;
        }
        
        f();
    `;
    
    const fix = true;
    
    const log = stub();
    const write = stub();
    
    const lint = stub().returns([
        source,
        [],
    ]);
    
    const simpleImport = stub().returns({
        lint,
    });
    
    mockRequire('./simple-import', {
        simpleImport,
    });
    
    const processFile = reRequire('./process-file');
    
    const fn = processFile({
        fix,
        log,
        write,
    });
    
    const result = await fn({
        name: __filename,
        source,
        index: 0,
        length: 1,
        options: {
            dir: '.',
        },
    });
    
    const expected = {
        code: source,
        places: [{
            message: 'Unexpected token, expected "{"',
            position: {
                column: 13,
                line: 2,
            },
            rule: 'parser',
        }, {
            message: 'Parsing error: Unexpected token =>',
            position: {
                column: 14,
                line: 2,
            },
            rule: 'parser (eslint)',
        }],
    };
    
    stopAll();
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: process-file: syntax errors: startLine', async (t) => {
    const source = montag`
        function f() => {
            return 'x';
            var s;
        }
        
        f();
    `;
    
    const fix = false;
    
    const log = stub();
    const write = stub();
    
    const options = parseOptions(__filename);
    
    const fn = processFile({
        fix,
        log,
        write,
    });
    
    const result = await fn({
        name: __filename,
        source,
        index: 0,
        length: 1,
        options,
        startLine: 4,
    });
    
    const expected = {
        code: source,
        places: [{
            message: `functions/methods should not have '=>'`,
            position: {
                column: 13,
                line: 5,
            },
            rule: 'parser (quick-lint-js)',
        }],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: process-file: transform error', async (t) => {
    const {extract} = await import('@putout/operate');
    const source = 'const a = () => {}';
    const fix = true;
    
    const log = stub();
    const write = stub();
    
    const fn = processFile({
        fix,
        log,
        write,
    });
    
    const plugin = {
        report: noop,
        fix: noop,
        traverse: () => ({
            Function(path) {
                extract(path);
            },
        }),
    };
    
    const {places} = await fn({
        name: 'example.js',
        source,
        index: 0,
        length: 1,
        options: {
            plugins: [
                ['throws', plugin],
            ],
        },
    });
    
    const {message} = places[0];
    
    t.match(message, `'operator.extract(node)' understands only Literals`);
    t.end();
});
