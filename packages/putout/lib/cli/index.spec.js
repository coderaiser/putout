'use strict';

const {join} = require('path');
const {readFile} = require('fs').promises;

const test = require('supertape');
const stub = require('@cloudcmd/stub');
const mockRequire = require('mock-require');
const stripAnsi = require('strip-ansi');
const tryCatch = require('try-catch');

const _cli = require('.');
const {version} = require('../../package');

const {reRequire, stopAll} = mockRequire;
const {parse} = JSON;

const {
    PLACE,
    NO_FILES,
    NO_PROCESSORS,
} = require('./exit-codes');

test('putout: cli: --raw', async (t) => {
    const logError = stub();
    const argv = [
        'xx',
        '--raw',
    ];
    
    const error = Error('No files matching the pattern "xx" were found');
    mockRequire('./get-files', stub().returns([error]));
    
    const cli = reRequire('.');
    
    await runCli({
        cli,
        logError,
        argv,
    });
    
    stopAll();
    
    t.ok(logError.calledWith(error), 'should call logError');
    t.end();
});

test('putout: cli: --ext', async (t) => {
    const argv = [
        '--ext',
        'xjs',
    ];
    
    const add = stub();
    
    const files = [];
    mockRequire('./supported-files', {add});
    mockRequire('./get-files', stub().returns([null, files]));
    
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
    });
    
    stopAll();
    
    t.ok(add.calledWith('xjs'), 'should call add');
    t.end();
});

test('putout: cli: multiple --ext', async (t) => {
    const argv = [
        '--ext',
        'xjs',
        '--ext',
        'extjs',
    ];
    
    const add = stub();
    
    const files = [];
    mockRequire('./supported-files', {add});
    mockRequire('./get-files', stub().returns([null, files]));
    
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
    });
    
    stopAll();
    
    const [, secondArgs] = add.args;
    const [args] = secondArgs;
    
    t.deepEqual(['xjs', 'extjs'], args);
    t.end();
});

test('putout: cli: --raw: PUTOUT_FILES', async (t) => {
    const {PUTOUT_FILES = ''} = process.env;
    
    process.env.PUTOUT_FILES = 'xx';
    
    const logError = stub();
    const argv = [
        '--raw',
    ];
    
    const error = Error('No files matching the pattern "xx" were found');
    mockRequire('./get-files', stub().returns([error]));
    
    const cli = reRequire('.');
    
    await runCli({
        cli,
        logError,
        argv,
    });
    
    stopAll();
    process.env.PUTOUT_FILES = PUTOUT_FILES;
    reRequire('.');
    
    t.ok(logError.calledWith(error), 'should call logError');
    t.end();
});

test('putout: cli: --raw: parse error', async (t) => {
    const logError = stub();
    const argv = [
        join(__dirname, 'fixture/parse-error.js'),
        '--raw',
        '--no-config',
        '--format',
        'none',
        '--no-ci',
        '--no-cache',
    ];
    
    reRequire('./get-files');
    reRequire('./process-file');
    const cli = reRequire('.');
    
    await runCli({
        cli,
        logError,
        argv,
        readFile,
    });
    
    const error = SyntaxError('Unexpected token (2:0)');
    t.ok(logError.calledWith(error), 'should call logError');
    t.end();
});

test('putout: cli: --format: specified twice', async (t) => {
    const argv = [
        __filename,
        '--no-config',
        '--format',
        'dump',
        '--format',
        'none',
        '--no-ci',
        '--no-cache',
    ];
    
    const process = stub().returns({
        places: [],
        code: '',
    });
    
    const processFile = stub().returns(process);
    const getFormatter = stub().returns([
        'dump',
        {},
    ]);
    
    const report = stub().returns(stub);
    
    mockRequire('./process-file', processFile);
    mockRequire('./formatter', {getFormatter});
    mockRequire('./report', report);
    
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
    });
    
    const [arg] = getFormatter.args;
    const [first] = arg;
    
    stopAll();
    
    t.equal(first, 'none', 'should use last passed formatter');
    t.end();
});

test('putout: cli: --fresh', async (t) => {
    const file = join(__dirname, 'fixture/parse-error.js');
    const argv = [
        file,
        '--no-config',
        '--no-cache',
        '--fresh',
    ];
    
    const {_defaultFileCache} = require('./cache-files');
    const cacheFiles = stub().returns(_defaultFileCache);
    const getOptions = stub().returns({
        formatter: 'dump',
        dir: '.',
        processors: [
            'javascript',
        ],
    });
    
    mockRequire('./cache-files', cacheFiles);
    mockRequire('./get-options', getOptions);
    
    reRequire('./get-files');
    
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
    });
    
    const expected = {
        fresh: true,
        cache: false,
    };
    
    t.ok(cacheFiles.calledWith(expected));
    t.end();
});

test('putout: cli: --raw: halt', async (t) => {
    const halt = stub();
    const argv = [
        'xx',
        '--raw',
    ];
    
    await runCli({
        halt,
        argv,
    });
    
    t.ok(halt.calledWith(NO_FILES), 'should call halt');
    t.end();
});

test('putout: cli: --version', (t) => {
    const log = stub();
    const argv = [
        '--version',
    ];
    
    runCli({
        log,
        argv,
    });
    
    const expected = `v${version}`;
    
    t.ok(log.calledWith(expected), 'should call halt');
    t.end();
});

test('putout: cli: -v', (t) => {
    const log = stub();
    const argv = [
        '-v',
    ];
    
    runCli({
        log,
        argv,
    });
    
    const expected = `v${version}`;
    
    t.ok(log.calledWith(expected), 'should call halt');
    t.end();
});

test('putout: cli: no files', (t) => {
    const log = stub();
    const argv = [];
    
    runCli({
        log,
        argv,
    });
    
    t.notOk(log.called, 'should not call log');
    t.end();
});

test('putout: cli: --fix --staged: set', async (t) => {
    const name = './xxx.js';
    const logError = stub();
    const get = stub().returns([
        name,
    ]);
    const set = stub().returns([
        'hello.txt',
    ]);
    
    const argv = [
        '--staged',
        '--fix',
    ];
    
    const getFiles = stub().returns([null, [
        name,
    ]]);
    
    const process = stub().returns({
        places: [],
        code: '',
    });
    
    const processFile = stub().returns(process);
    
    mockRequire('./get-files', getFiles);
    mockRequire('./process-file', processFile);
    
    mockRequire('./staged', {
        get,
        set,
    });
    
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
        logError,
    });
    
    stopAll();
    
    t.ok(set.calledWith());
    t.end();
});

test('putout: cli: --fix --staged: exit code', async (t) => {
    const {STAGE} = require('./exit-codes');
    const name = './xxx.js';
    const logError = stub();
    const halt = stub();
    const get = stub().returns([
        name,
    ]);
    const set = stub().returns([]);
    
    const argv = [
        '--staged',
        '--fix',
    ];
    
    const getFiles = stub().returns([null, [
        name,
    ]]);
    
    const process = stub().returns({
        places: [],
        code: '',
    });
    const processFile = stub().returns(process);
    const {_defaultFileCache} = require('./cache-files');
    const cacheFiles = stub().returns(_defaultFileCache);
    
    mockRequire('./get-files', getFiles);
    mockRequire('./process-file', processFile);
    mockRequire('./cache-files', cacheFiles);
    
    mockRequire('./staged', {
        get,
        set,
    });
    
    const cli = reRequire('.');
    
    await runCli({
        halt,
        cli,
        argv,
        logError,
    });
    
    stopAll();
    
    t.ok(halt.calledWith(STAGE));
    t.end();
});

test('putout: cli: --staged --fix', async (t) => {
    const logError = stub();
    const get = stub().returns(['./xxx.js']);
    const set = stub().returns([
        'hello.txt',
    ]);
    
    const argv = [
        '--staged',
        '--fix',
    ];
    
    mockRequire('./staged', {
        get,
        set,
    });
    
    reRequire('./get-files');
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
        logError,
    });
    
    const [allArgCalls] = logError.args;
    const [arg] = allArgCalls;
    
    const output = stripAnsi(arg);
    const message = 'No files matching the pattern "./xxx.js" were found';
    
    stopAll();
    
    t.equal(output, message, 'should equal');
    t.end();
});

test('putout: cli: ruler processor: --enable', async (t) => {
    const logError = stub();
    const rullerProcessor = stub();
    const argv = [
        '--enable',
        'convert-index-of-to-includes',
    ];
    
    mockRequire('./ruler-processor', rullerProcessor);
    
    const cli = reRequire('.');
    await runCli({
        cli,
        argv,
        logError,
    });
    
    stopAll();
    
    const places = [];
    const args = {
        disable: '',
        enable: 'convert-index-of-to-includes',
    };
    
    t.ok(rullerProcessor.calledWith(args, places));
    t.end();
});

test('putout: cli: ruler processor: --enable-all', async (t) => {
    const logError = stub();
    const rullerProcessor = stub();
    const argv = [
        '--enable-all',
        __filename,
    ];
    
    mockRequire('./ruler-processor', rullerProcessor);
    
    const cli = reRequire('.');
    await runCli({
        cli,
        argv,
        logError,
    });
    
    stopAll();
    
    t.ok(rullerProcessor.called);
    t.end();
});

test('putout: cli: tsx', async (t) => {
    const write = stub();
    
    const argv = [
        '--no-config',
        '--no-cache',
        join(__dirname, 'fixture', 'view.tsx'),
    ];
    
    const eslint = stub().returns(['', []]);
    const getOptions = stub().returns({
        dir: '.',
        formatter: 'dump',
        processors: [
            'javascript',
        ],
    });
    
    mockRequire('./eslint', eslint);
    mockRequire('./get-options', getOptions);
    
    reRequire('./process-file');
    const cli = reRequire('.');
    
    await runCli({
        cli,
        write,
        argv,
    });
    
    stopAll();
    
    t.ok(write.calledWith(''), 'should call logError');
    t.end();
});

test('putout: cli: --transform', async (t) => {
    const write = stub();
    const eslint = stub().returns(['', []]);
    
    const name = join(__dirname, 'fixture/transform.js');
    const source = await readFile(name, 'utf8');
    const transform = 'const __a = __b -> const __b = __a';
    
    const argv = [
        name,
        '--transform',
        `"${transform}"`,
        '--no-config',
        '--format',
        'json',
        '--no-ci',
        '--no-cache',
    ];
    
    mockRequire('./eslint', eslint);
    reRequire('./process-file');
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
        write,
        readFile,
    });
    
    stopAll();
    
    const expected = {
        errors: [{
            name,
            source,
            places: [{
                rule: '[transform]',
                message: transform,
                position: {
                    line: 1,
                    column: 0,
                },
            }],
        }],
        filesCount: 1,
        errorsCount: 1,
    };
    
    const [arg] = write.args;
    const [first] = arg;
    const [, result = {}] = tryCatch(parse, first);
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: --plugins', async (t) => {
    const write = stub();
    const eslint = stub().returns(['', []]);
    
    const name = join(__dirname, 'fixture/plugins.js');
    const source = await readFile(name, 'utf8');
    
    const argv = [
        name,
        '--plugins',
        'remove-unused-variables,remove-debugger',
        '--no-config',
        '--format',
        'json',
        '--no-ci',
        '--no-cache',
    ];
    
    mockRequire('./eslint', eslint);
    reRequire('./process-file');
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
        write,
        readFile,
    });
    
    stopAll();
    
    const expected = {
        errors: [{
            name,
            source,
            places: [{
                rule: 'remove-unused-variables',
                message: '"a" is defined but never used',
                position: {
                    line: 1,
                    column: 6,
                },
            }, {
                rule: 'remove-debugger',
                message: `Unexpected "debugger" statement`,
                position: {
                    line: 2,
                    column: 0,
                },
            }],
        }],
        filesCount: 1,
        errorsCount: 2,
    };
    
    const [arg] = write.args;
    const [first] = arg;
    const [, result = {}] = tryCatch(parse, first);
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: fix', async (t) => {
    const argv = [
        __filename,
        '--no-config',
        '--no-ci',
        '--no-cache',
        '--fix',
    ];
    
    const process = stub().returns({
        places: [],
        code: 'hello',
    });
    
    const processFile = stub().returns(process);
    const writeFile = stub();
    const getOptions = stub().returns({
        dir: __dirname,
        formatter: 'dump',
        processors: [
            'javascript',
        ],
    });
    
    mockRequire('./get-options', getOptions);
    mockRequire('./process-file', processFile);
    
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
        writeFile,
    });
    
    stopAll();
    
    t.ok(writeFile.calledWith(__filename, 'hello'));
    t.end();
});

test('putout: cli: no processors', async (t) => {
    const argv = [
        __filename,
        '--no-config',
        '--no-ci',
        '--no-cache',
    ];
    
    const process = stub().returns({
        places: [],
        code: 'hello',
    });
    
    const halt = stub();
    const processFile = stub().returns(process);
    const getOptions = stub().returns({
        dir: __dirname,
        formatter: 'dump',
        processors: [
        ],
    });
    
    mockRequire('./get-options', getOptions);
    mockRequire('./process-file', processFile);
    
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
        halt,
    });
    
    stopAll();
    
    t.ok(halt.calledWith(NO_PROCESSORS));
    t.end();
});

test('putout: cli: not fixable', async (t) => {
    const argv = [
        __filename,
        '--no-config',
        '--no-ci',
        '--no-cache',
    ];
    
    const getOptions = stub().returns({
        dir: __dirname,
        formatter: 'dump',
        processors: [
        ],
    });
    
    const runProcessors = stub().returns({
        isProcessed: true,
        places: [{
            rule: 'eslint/null',
            position: {
                line: 1,
                column: 1,
            },
        }],
    });
    
    const setInfo = stub();
    const getExtensions = stub();
    const fileCache = stub().returns({
        setInfo,
    });
    
    mockRequire('./get-options', getOptions);
    mockRequire('./file-cache', fileCache);
    mockRequire('@putout/engine-processor', {
        runProcessors,
        getExtensions,
    });
    
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
    });
    
    stopAll();
    
    t.notOk(setInfo.called, 'should not call fileCache.setInfo');
    t.end();
});

test('putout: cli: setInfo: crash', async (t) => {
    const argv = [
        __filename,
        '--no-config',
        '--no-ci',
        '--no-cache',
    ];
    
    const getOptions = stub().returns({
        dir: __dirname,
        formatter: 'dump',
        processors: [
        ],
    });
    
    const runProcessors = stub().returns({
        isProcessed: true,
        places: [{
            rule: 'crash/promises/add-return-await',
            position: {
                line: 1,
                column: 1,
            },
        }],
    });
    
    const setInfo = stub();
    const getExtensions = stub().returns([]);
    const fileCache = stub().returns({
        setInfo,
    });
    
    mockRequire('./get-options', getOptions);
    mockRequire('./file-cache', fileCache);
    mockRequire('@putout/engine-processor', {
        runProcessors,
        getExtensions,
    });
    
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
    });
    
    stopAll();
    
    t.notOk(setInfo.called, 'should not call fileCache.setInfo');
    t.end();
});

test('putout: cli: fileCache: canUseCache', async (t) => {
    const argv = [
        __filename,
        '--no-config',
        '--no-ci',
        '--no-cache',
    ];
    
    const options = {
        dir: __dirname,
        formatter: 'dump',
    };
    
    const getOptions = stub().returns(options);
    
    const canUseCache = stub().returns(true);
    const getPlaces = stub().returns([]);
    const reconcile = stub();
    const fileCache = stub().returns({
        canUseCache,
        getPlaces,
        reconcile,
    });
    
    mockRequire('./get-options', getOptions);
    mockRequire('./cache-files', fileCache);
    
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
    });
    
    stopAll();
    
    const expected = {
        fix: false,
        name: __filename,
        options,
    };
    
    t.ok(canUseCache.calledWith(expected), 'should not call fileCache.canUseCache');
    t.end();
});

test('putout: cli: --debug', async (t) => {
    const argv = [
        __filename,
        '--no-config',
        '--no-ci',
        '--no-cache',
        '--debug',
    ];
    
    const halt = stub();
    const getOptions = stub().returns({
        dir: __dirname,
        formatter: 'dump',
    });
    
    const name = join(__dirname, './fixture/parse-error.js');
    const source = await readFile(name, 'utf8');
    
    const readFileStub = stub().returns(source);
    
    mockRequire('./get-options', getOptions);
    
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
        halt,
        readFile: readFileStub,
    });
    
    stopAll();
    
    t.ok(halt.calledWith(PLACE));
    t.end();
});

test('putout: cli: get files: called with ignore option', async (t) => {
    const argv = [
        __filename,
        '--no-ci',
        '--no-cache',
    ];
    
    const ignore = ['xxx'];
    const getOptions = stub().returns({
        dir: __dirname,
        formatter: 'dump',
        ignore,
    });
    
    const getFiles = stub().returns(['dir', []]);
    
    mockRequire('./get-options', getOptions);
    mockRequire('./get-files', getFiles);
    
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
    });
    
    stopAll();
    
    const expected = [
        [__filename], {
            ignore,
        },
    ];
    
    t.ok(getFiles.calledWith(...expected));
    t.end();
});

async function runCli(options) {
    const {
        halt = stub(),
        log = stub(),
        logError = stub(),
        write = stub(),
        argv = [],
        cli = _cli,
        readFile = stub().returns(''),
        writeFile = stub(),
    } = options;
    
    await cli({
        write,
        halt,
        log,
        logError,
        argv,
        readFile,
        writeFile,
    });
}

