'use strict';

const {env} = require('process');

process.env.CI = process.env.CI || 'true';

const {join, basename} = require('path');
const {readFile} = require('fs/promises');
const {EventEmitter} = require('events');

const {
    test,
    stub,
} = require('supertape');
const mockRequire = require('mock-require');
const tryCatch = require('try-catch');
const tryToCatch = require('try-to-catch');
const {simpleImport} = require('./simple-import');

const _cli = require('.');
const {version} = require('../../package');

const {reRequire, stopAll} = mockRequire;
const {parse} = JSON;
const {assign} = Object;

const {
    OK,
    PLACE,
    NO_FILES,
    NO_PROCESSORS,
    WAS_STOP,
    INVALID_OPTION,
    CANNOT_LOAD_PROCESSOR,
    RULLER_WITH_FIX,
    INVALID_CONFIG,
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
    
    t.calledWith(logError, [error], 'should call logError');
    t.end();
});

test('putout: cli: --raw: PUTOUT_FILES', async (t) => {
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
    
    delete process.env.PUTOUT_FILES;
    reRequire('.');
    
    t.calledWith(logError, [error], 'should call logError');
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
    assign(error, {
        pos: 11,
        loc: {
            column: 0,
            line: 2,
        },
    });
    
    t.calledWith(logError, [error], 'should call logError');
    t.end();
});

test('putout: cli: --format: ci', async (t) => {
    const argv = [
        __filename,
        '--no-config',
        '--ci',
    ];
    
    const process = stub().returns({
        places: [{
            rule: 'remove-unused-variables',
            message: 'hello',
            position: {
                line: 1,
                column: 1,
            },
        }],
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
    mockRequire('ci-info', {
        isCI: true,
    });
    
    reRequire('./runner/worker.js');
    reRequire('./runner/runner.js');
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
    });
    
    stopAll();
    
    t.calledWith(getFormatter, ['stream', stub()]);
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
    
    reRequire('./runner/worker.js');
    reRequire('./runner/runner.js');
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

test('putout: cli: no ide', async (t) => {
    const name = basename(__filename);
    const argv = [
        name,
        '--fresh',
    ];
    
    const processFile = stub().returns(stub().returns({
        places: [],
        code: '',
    }));
    
    const getFormatter = stub().returns([
        'dump',
        {},
    ]);
    
    const report = stub();
    const getFiles = stub().returns([null, [
        name,
    ]]);
    
    const canUseCache = stub().returns(false);
    const getPlaces = stub().returns([]);
    const reconcile = stub();
    const setInfo = stub();
    
    const createCache = stub().returns({
        canUseCache,
        getPlaces,
        reconcile,
        setInfo,
    });
    
    mockRequire('./process-file', processFile);
    mockRequire('./formatter', {getFormatter});
    mockRequire('./report', stub().returns(report));
    mockRequire('./get-files', getFiles);
    
    mockRequire('@putout/cli-cache', {createCache});
    
    const {
        TERMINAL_EMULATOR,
        TERM_PROGRAM,
    } = env;
    
    delete env.TERMINAL_EMULATOR;
    delete env.TERM_PROGRAM;
    
    reRequire('./runner/worker.js');
    reRequire('./runner/runner.js');
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
    });
    
    stopAll();
    
    env.TERMINAL_EMULATOR = TERMINAL_EMULATOR;
    env.TERM_PROGRAM = TERM_PROGRAM;
    
    const expected = ['dump', {
        count: 1,
        formatterOptions: {},
        index: 0,
        name,
        places: [],
        report: stub(),
        source: '',
    }];
    
    t.calledWith(report, expected);
    t.end();
});

test('putout: cli: ide: web storm', async (t) => {
    const name = basename(__filename);
    const argv = [
        name,
        '--fresh',
    ];
    
    const {TERMINAL_EMULATOR} = process.env;
    process.env.TERMINAL_EMULATOR = 'JetBrains-JediTerm';
    
    const processFile = stub().returns(stub().returns({
        places: [],
        code: '',
    }));
    
    const getFormatter = stub().returns([
        'dump',
        {},
    ]);
    
    const report = stub();
    
    const getFiles = stub().returns([null, [
        name,
    ]]);
    
    const canUseCache = stub().returns(false);
    const getPlaces = stub().returns([]);
    const reconcile = stub();
    const setInfo = stub();
    
    const createCache = stub().returns({
        canUseCache,
        getPlaces,
        reconcile,
        setInfo,
    });
    
    mockRequire('./process-file', processFile);
    mockRequire('./formatter', {getFormatter});
    mockRequire('./report', stub().returns(report));
    mockRequire('./get-files', getFiles);
    mockRequire('@putout/cli-cache', {createCache});
    
    const simpleImport = async (url) => {
        /*
        if (url.includes('ruler'))
            return {
                ruler,
            };
            */
        
        if (url === 'chalk')
            return {
                red: stub(),
            };
        
        if (url.includes('processor'))
            return await import(url);
    };
    
    mockRequire('./simple-import.js', {
        simpleImport,
    });
    
    reRequire('./runner/worker.js');
    reRequire('./runner/runner.js');
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
    });
    
    stopAll();
    process.env.TERMINAL_EMULATOR = TERMINAL_EMULATOR;
    
    const expected = ['dump', {
        count: 1,
        formatterOptions: {},
        index: 0,
        name: join(process.cwd(), name),
        places: [],
        report: stub(),
        source: '',
    }];
    
    t.calledWith(report, expected);
    t.end();
});

test('putout: cli: ide: vs code', async (t) => {
    const name = basename(__filename);
    const argv = [
        name,
        '--fresh',
    ];
    
    const {TERM_PROGRAM} = process.env;
    process.env.TERM_PROGRAM = 'vscode';
    
    const processFile = stub().returns(stub().returns({
        places: [],
        code: '',
    }));
    
    const getFormatter = stub().returns([
        'dump',
        {},
    ]);
    
    const report = stub();
    
    const getFiles = stub().returns([null, [
        name,
    ]]);
    
    const canUseCache = stub().returns(false);
    const getPlaces = stub().returns([]);
    const reconcile = stub();
    const setInfo = stub();
    
    const createCache = stub().returns({
        canUseCache,
        getPlaces,
        reconcile,
        setInfo,
    });
    
    mockRequire('./process-file', processFile);
    mockRequire('./formatter', {getFormatter});
    mockRequire('./report', stub().returns(report));
    mockRequire('./get-files', getFiles);
    mockRequire('@putout/cli-cache', {createCache});
    
    reRequire('./runner/worker.js');
    reRequire('./runner/runner.js');
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
    });
    
    stopAll();
    process.env.TERM_PROGRAM = TERM_PROGRAM;
    
    const expected = ['dump', {
        count: 1,
        formatterOptions: {},
        index: 0,
        name: join(process.cwd(), name),
        places: [],
        report: stub(),
        source: '',
    }];
    
    t.calledWith(report, expected);
    t.end();
});

test('putout: cli: ide: vs code: cache', async (t) => {
    const name = basename(__filename);
    const argv = [
        name,
        '--cache',
    ];
    
    const {TERM_PROGRAM} = process.env;
    process.env.TERM_PROGRAM = 'vscode';
    
    const processFile = stub().returns(stub().returns({
        places: [],
        code: '',
    }));
    
    const getFormatter = stub().returns([
        'dump',
        {},
    ]);
    
    const report = stub();
    
    const getFiles = stub().returns([null, [
        name,
    ]]);
    
    const canUseCache = stub().returns(false);
    const getPlaces = stub().returns([]);
    const reconcile = stub();
    const setInfo = stub();
    
    const createCache = stub().returns({
        canUseCache,
        getPlaces,
        reconcile,
        setInfo,
    });
    
    mockRequire('./process-file', processFile);
    mockRequire('./formatter', {getFormatter});
    mockRequire('./report', stub().returns(report));
    mockRequire('./get-files', getFiles);
    mockRequire('@putout/cli-cache', {createCache});
    
    reRequire('./runner/worker.js');
    reRequire('./runner/runner.js');
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
    });
    
    stopAll();
    process.env.TERM_PROGRAM = TERM_PROGRAM;
    
    const expected = ['dump', {
        count: 1,
        formatterOptions: {},
        index: 0,
        name: join(process.cwd(), name),
        places: [],
        report: stub(),
        source: '',
    }];
    
    t.calledWith(report, expected);
    t.end();
});

test('putout: cli: no ide: cache', async (t) => {
    const name = basename(__filename);
    const argv = [
        name,
        '--cache',
    ];
    
    const {TERMINAL_EMULATOR} = process.env;
    process.env.TERMINAL_EMULATOR = 'none';
    
    const processFile = stub().returns(stub().returns({
        places: [],
        code: '',
    }));
    
    const getFormatter = stub().returns([
        'dump',
        {},
    ]);
    
    const report = stub();
    
    const getFiles = stub().returns([null, [
        name,
    ]]);
    
    const canUseCache = stub().returns(false);
    const getPlaces = stub().returns([]);
    const reconcile = stub();
    const setInfo = stub();
    
    const createCache = stub().returns({
        canUseCache,
        getPlaces,
        reconcile,
        setInfo,
    });
    
    mockRequire('./process-file', processFile);
    mockRequire('./formatter', {getFormatter});
    mockRequire('./report', stub().returns(report));
    mockRequire('./get-files', getFiles);
    mockRequire('@putout/cli-cache', {createCache});
    
    reRequire('./runner/worker.js');
    reRequire('./runner/runner.js');
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
    });
    
    stopAll();
    process.env.TERMINAL_EMULATOR = TERMINAL_EMULATOR;
    
    const expected = ['dump', {
        count: 1,
        formatterOptions: {},
        index: 0,
        name,
        places: [],
        report: stub(),
        source: '',
    }];
    
    t.calledWith(report, expected);
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
    
    const {_defaultCache} = require('@putout/cli-cache');
    const createCache = stub().returns(_defaultCache);
    const getOptions = stub().returns({
        formatter: 'dump',
        dir: '.',
        processors: [
            'javascript',
        ],
    });
    
    mockRequire('@putout/cli-cache', {createCache});
    mockRequire('./get-options', getOptions);
    
    reRequire('./get-files');
    
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
    });
    
    stopAll();
    
    const expected = {
        fresh: true,
        cache: false,
        version,
    };
    
    t.calledWith(createCache, [expected]);
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
    
    t.calledWith(halt, [NO_FILES], 'should call halt');
    t.end();
});

test('putout: cli: --version', async (t) => {
    const log = stub();
    const argv = [
        '--version',
    ];
    
    await runCli({
        log,
        argv,
    });
    
    const expected = `v${version}`;
    
    t.calledWith(log, [expected], 'should call halt');
    t.end();
});

test('putout: cli: -v', async (t) => {
    const log = stub();
    const argv = [
        '-v',
    ];
    
    await runCli({
        log,
        argv,
    });
    
    const expected = `v${version}`;
    
    t.calledWith(log, [expected], 'should call halt');
    t.end();
});

test('putout: cli: no files', async (t) => {
    const log = stub();
    const argv = [];
    
    await runCli({
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
        '--no-cache',
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
    
    const {findUp} = await import('find-up');
    
    t.calledWith(set, [{findUp}]);
    t.end();
});

test('putout: cli: --fix --staged: get', async (t) => {
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
        '--no-cache',
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
    
    const {findUp} = await import('find-up');
    
    t.calledWith(get, [{findUp}]);
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
    const {_defaultCache} = require('@putout/cli-cache');
    const createCache = stub().returns(_defaultCache);
    
    mockRequire('./get-files', getFiles);
    mockRequire('./process-file', processFile);
    mockRequire('@putout/cli-cache', {createCache});
    
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
    
    t.calledWith(halt, [STAGE]);
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
    
    const stripAnsi = await simpleImport('strip-ansi');
    const output = stripAnsi(arg);
    const message = `🐊 No files matching the pattern './xxx.js' were found`;
    
    stopAll();
    
    t.equal(output, message);
    t.end();
});

test('putout: cli: ruler: --enable', async (t) => {
    const logError = stub();
    const readFile = stub();
    const writeFile = stub();
    const ruler = stub();
    const argv = [
        '--enable',
        'convert-index-of-to-includes',
    ];
    
    const simpleImport = async (url) => {
        if (url.includes('ruler'))
            return {
                ruler,
            };
        
        if (url === 'chalk')
            return {
                red: stub(),
            };
        
        if (url.includes('processor'))
            return await import(url);
    };
    
    mockRequire('./simple-import', {
        simpleImport,
    });
    
    const cli = reRequire('.');
    await runCli({
        cli,
        argv,
        logError,
        readFile,
        writeFile,
    });
    
    stopAll();
    
    const places = [];
    const args = {
        disable: '',
        enable: 'convert-index-of-to-includes',
        readFile,
        writeFile,
    };
    
    t.calledWith(ruler, [args, places]);
    t.end();
});

test('putout: cli: ruler: --enable-all', async (t) => {
    const logError = stub();
    const ruler = stub();
    const argv = [
        '--enable-all',
        __filename,
    ];
    
    const simpleImport = async (url) => {
        if (url.includes('ruler'))
            return {
                ruler,
            };
        
        if (url === 'chalk')
            return {
                red: stub(),
            };
        
        if (url.includes('processor'))
            return await import(url);
    };
    
    mockRequire('./simple-import', {
        simpleImport,
    });
    
    const cli = reRequire('.');
    await runCli({
        cli,
        argv,
        logError,
    });
    
    stopAll();
    
    t.ok(ruler.called);
    t.end();
});

test('putout: cli: ruler processor: --disable-all', async (t) => {
    const name = join(__dirname, 'fixture/plugins.js');
    const logError = stub();
    const argv = [
        '--disable-all',
        name,
    ];
    
    const rulerError = Error('should call ruler with await');
    const ruler = stub().rejects(rulerError);
    
    const simpleImport = async (url) => {
        if (url.includes('ruler'))
            return {
                ruler,
            };
        
        if (url === 'chalk')
            return {
                red: stub(),
            };
        
        if (url.includes('processor'))
            return await import(url);
    };
    
    mockRequire('./simple-import', {
        simpleImport,
    });
    
    const cli = reRequire('.');
    
    const [error] = await tryToCatch(runCli, {
        cli,
        argv,
        logError,
    });
    
    stopAll();
    
    t.equal(error, rulerError);
    t.end();
});

test('putout: cli: ruler processor: --enable-all: no path', async (t) => {
    const logError = stub();
    const argv = [
        '--enable-all',
    ];
    
    const cli = reRequire('.');
    
    await tryToCatch(runCli, {
        cli,
        argv,
        logError,
    });
    
    stopAll();
    
    const {red} = await simpleImport('chalk');
    const expected = red('🐊 `path` is missing for ruler toggler (`--enable-all`, `--disable-all`)');
    
    t.calledWith(logError, [expected]);
    t.end();
});

test('putout: cli: ruler processor: --enable-all: no path: code', async (t) => {
    const name = join(__dirname, 'fixture/plugins.js');
    const logError = stub();
    const argv = [
        '--enable-all',
        '--fix',
        name,
    ];
    const halt = stub();
    
    const cli = reRequire('.');
    
    await tryToCatch(runCli, {
        cli,
        argv,
        logError,
        halt,
    });
    
    stopAll();
    
    t.calledWith(halt, [RULLER_WITH_FIX]);
    t.end();
});

test('putout: cli: ruler processor: --enable-all --fix: code', async (t) => {
    const name = join(__dirname, 'fixture/plugins.js');
    const logError = stub();
    const argv = [
        '--enable-all',
        '--fix',
        name,
    ];
    const halt = stub();
    
    const cli = reRequire('.');
    
    await tryToCatch(runCli, {
        cli,
        argv,
        logError,
        halt,
    });
    
    stopAll();
    
    t.calledWith(halt, [RULLER_WITH_FIX]);
    t.end();
});

test('putout: cli: ruler processor: --enable --fix: log', async (t) => {
    const name = join(__dirname, 'fixture/plugins.js');
    const logError = stub();
    const argv = [
        '--enable',
        'hello',
        '--fix',
        name,
    ];
    const cli = reRequire('.');
    
    await tryToCatch(runCli, {
        cli,
        argv,
        logError,
    });
    
    stopAll();
    
    const {red} = await simpleImport('chalk');
    const expected = red(`🐊 '--fix' cannot be used with ruler toggler ('--enable', '--disable')`);
    
    t.calledWith(logError, [expected]);
    t.end();
});

test('putout: cli: ruler processor: --enable-all --fix', async (t) => {
    const name = join(__dirname, 'fixture/plugins.js');
    const logError = stub();
    const argv = [
        '--enable-all',
        '--fix',
        name,
    ];
    const halt = stub();
    
    const cli = reRequire('.');
    
    await tryToCatch(runCli, {
        cli,
        argv,
        logError,
        halt,
    });
    
    stopAll();
    
    t.calledWith(halt, [RULLER_WITH_FIX]);
    t.end();
});

test('putout: cli: --match', async (t) => {
    const logError = stub();
    const argv = [
        '--match',
        '*.md',
    ];
    
    const readError = Error('cannot read config file');
    const readFile = stub().rejects(readError);
    const writeFile = stub();
    const halt = stub();
    
    const {matchErrors, READ_ERROR} = await import('@putout/cli-match');
    const cli = reRequire('.');
    await runCli({
        cli,
        halt,
        argv,
        logError,
        readFile,
        writeFile,
    });
    
    t.calledWith(halt, [READ_ERROR], matchErrors[READ_ERROR]);
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
    
    t.calledWith(write, [''], 'should call logError');
    t.end();
});

test('putout: cli: d.ts', async (t) => {
    const name = join(__dirname, 'fixture', 'types.d.ts');
    const halt = stub();
    
    const argv = [
        name,
    ];
    
    const parseOptions = require('../parse-options');
    const options = parseOptions({
        name,
    });
    
    assign(options, {
        ignore: [],
    });
    
    const getOptions = stub().returns(options);
    
    mockRequire('./get-options', getOptions);
    
    const cli = reRequire('.');
    
    await runCli({
        halt,
        cli,
        argv,
        readFile,
    });
    
    stopAll();
    
    t.calledWith(halt, [OK]);
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
        String(transform),
        '--no-config',
        '--format',
        'json',
        '--no-ci',
        '--no-cache',
    ];
    
    mockRequire('./eslint', eslint);
    
    reRequire('./process-file');
    reRequire('./runner/worker.js');
    reRequire('./runner/runner.js');
    
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
    reRequire('./runner/worker.js');
    reRequire('./runner/runner.js');
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
                message: `'a' is defined but never used`,
                position: {
                    line: 1,
                    column: 6,
                },
            }, {
                rule: 'remove-debugger',
                message: `Unexpected 'debugger' statement`,
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
    
    reRequire('./runner/worker.js');
    reRequire('./runner/runner.js');
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
        writeFile,
    });
    
    stopAll();
    
    t.calledWith(writeFile, [__filename, 'hello']);
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
    
    reRequire('./runner/worker.js');
    reRequire('./runner/runner.js');
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
        halt,
    });
    
    stopAll();
    
    t.calledWith(halt, [NO_PROCESSORS]);
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
    const getFilePatterns = stub().returns([]);
    const fileCache = stub().returns({
        setInfo,
    });
    const {getProcessorRunners} = reRequire('@putout/engine-processor');
    
    mockRequire('./get-options', getOptions);
    mockRequire('./file-cache', fileCache);
    mockRequire('@putout/engine-processor', {
        runProcessors,
        getFilePatterns,
        getProcessorRunners,
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
            rule: 'parser',
            position: {
                line: 1,
                column: 1,
            },
        }],
    });
    
    const setInfo = stub();
    const getFilePatterns = stub().returns([]);
    const fileCache = stub().returns({
        setInfo,
    });
    
    const {getProcessorRunners} = require('@putout/engine-processor');
    
    mockRequire('./get-options', getOptions);
    mockRequire('./file-cache', fileCache);
    mockRequire('@putout/engine-processor', {
        runProcessors,
        getFilePatterns,
        getProcessorRunners,
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
    const createCache = stub().returns({
        canUseCache,
        getPlaces,
        reconcile,
    });
    
    mockRequire('./get-options', getOptions);
    mockRequire('@putout/cli-cache', {createCache});
    
    reRequire('./runner/worker.js');
    reRequire('./runner/runner.js');
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
    });
    
    stopAll();
    
    const expected = [
        __filename,
        options,
    ];
    
    t.calledWith(canUseCache, expected);
    t.end();
});

test('putout: cli: exit code: PLACE', async (t) => {
    const argv = [
        __filename,
        '--no-config',
        '--no-ci',
        '--no-cache',
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
    
    reRequire('./runner/worker.js');
    reRequire('./runner/runner.js');
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
        halt,
        readFile: readFileStub,
    });
    
    stopAll();
    
    t.calledWith(halt, [PLACE]);
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
    
    t.calledWith(getFiles, expected);
    t.end();
});

test('putout: cli: get files: was stop', async (t) => {
    const argv = [
        '--no-cache',
        '--no-config',
    ];
    
    const ignore = ['xxx'];
    const getOptions = stub().returns({
        dir: __dirname,
        formatter: 'dump',
        ignore,
    });
    
    const getFiles = stub().returns([null, [
        __filename,
        __filename,
    ]]);
    const halt = stub();
    const isStop = stub().returns(true);
    const keypress = stub().returns({
        isStop,
    });
    
    mockRequire('./get-options', getOptions);
    mockRequire('./get-files', getFiles);
    mockRequire('@putout/cli-keypress', keypress);
    
    reRequire('./runner/worker.js');
    reRequire('./runner/runner.js');
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
        halt,
    });
    
    stopAll();
    
    t.calledWith(halt, [WAS_STOP], 'should set WAS_STOP status');
    t.end();
});

test('putout: cli: get files: was stop: no', async (t) => {
    const argv = [
        __filename,
        '--no-cache',
        '--no-config',
    ];
    
    const ignore = ['xxx'];
    const getOptions = stub().returns({
        dir: __dirname,
        formatter: 'dump',
        ignore,
    });
    
    const getFiles = stub().returns([null, [
        __filename,
    ]]);
    const halt = stub();
    const isStop = stub().returns(false);
    const onHalt = stub().returns({
        isStop,
    });
    
    mockRequire('./get-options', getOptions);
    mockRequire('./get-files', getFiles);
    mockRequire('./on-halt', onHalt);
    
    reRequire('./runner/worker.js');
    reRequire('./runner/runner.js');
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
        halt,
    });
    
    stopAll();
    
    t.calledWith(halt, [OK], 'should set OK status');
    t.end();
});

test('putout: cli: invalid option', async (t) => {
    const argv = [
        '--hello-world',
    ];
    
    const halt = stub();
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
        halt,
    });
    
    stopAll();
    
    t.calledWith(halt, [INVALID_OPTION], 'should exit with INVALID_OPTION code');
    t.end();
});

test('putout: cli: invalid option: message', async (t) => {
    const argv = [
        '--hello-world',
    ];
    
    const logError = stub();
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
        logError,
    });
    
    stopAll();
    
    const {red} = await simpleImport('chalk');
    const expected = red('🐊 Invalid option `--hello-world`. Perhaps you meant `--help`');
    
    t.calledWith(logError, [expected], 'should show message about invalid option');
    t.end();
});

test('putout: cli: invalid option: message: one char', async (t) => {
    const argv = [
        '-z',
    ];
    
    const logError = stub();
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
        logError,
    });
    
    stopAll();
    
    const {red} = await simpleImport('chalk');
    const expected = red(`🐊 Invalid option '-z'`);
    
    t.calledWith(logError, [expected], 'should show message about invalid option');
    t.end();
});

test('putout: cli: cannot load processor', async (t) => {
    const argv = [];
    
    const halt = stub();
    
    const putoutConfig = require('../../putout.json');
    const {processors} = putoutConfig;
    
    processors.push('hello');
    
    mockRequire('../../putout.json', putoutConfig);
    
    const cli = reRequire('.');
    
    reRequire('../parse-options');
    reRequire('./get-options');
    
    await runCli({
        cli,
        argv,
        halt,
    });
    
    stopAll();
    
    t.calledWith(halt, [CANNOT_LOAD_PROCESSOR], 'should exit with CANNOT_LOAD_PROCESSOR code');
    t.end();
});

test('putout: cli: cannot load processor: not found', async (t) => {
    const argv = [];
    
    const logError = stub();
    const loadProcessorsAsync = stub().rejects(Error(`Processor "putout-processor-hello" could not be found!`));
    
    mockRequire('@putout/engine-loader', {
        loadProcessorsAsync,
    });
    
    reRequire('@putout/engine-processor');
    const cli = reRequire('.');
    
    await runCli({
        cli,
        argv,
        logError,
    });
    
    stopAll();
    
    const {red} = await simpleImport('chalk');
    const expected = red(`🐊 Processor "putout-processor-hello" could not be found!`);
    
    t.calledWith(logError, [expected], 'should show message about invalid option');
    t.end();
});

test('putout: cli: addOnce', (t) => {
    const fn = stub();
    const {_addOnce} = reRequire('.');
    const emitter = new EventEmitter();
    
    _addOnce(emitter, 'hello', fn);
    _addOnce(emitter, 'hello', fn);
    
    const result = emitter.listenerCount('hello');
    
    t.equal(result, 1);
    t.end();
});

test('putout: processor throw', async (t) => {
    const file = join(__dirname, 'fixture/processor.throw');
    const throwProcessor = require('./fixture/processor-throw');
    const argv = [
        file,
        '--no-config',
        '--no-cache',
        '--no-ci',
        '--format',
        'json-lines',
    ];
    
    const getOptions = stub().returns({
        formatter: await simpleImport('@putout/formatter-json'),
        dir: '.',
        processors: [
            ['throw-processor', throwProcessor],
        ],
    });
    
    reRequire('@putout/engine-processor');
    
    mockRequire('./get-options', getOptions);
    
    reRequire('./runner/worker.js');
    reRequire('./runner/runner.js');
    
    const cli = reRequire('.');
    const write = stub();
    
    await runCli({
        cli,
        write,
        argv,
    });
    
    const {places} = parse(write.args[0]);
    const [{rule}] = places;
    
    stopAll();
    
    t.equal(rule, 'parser');
    t.end();
});

test('putout: processor throw: raw', async (t) => {
    const file = join(__dirname, 'fixture/processor.throw');
    const throwProcessor = require('./fixture/processor-throw');
    const argv = [
        file,
        '--no-config',
        '--no-cache',
        '--no-ci',
        '--format',
        'json-lines',
        '--raw',
    ];
    
    const getOptions = stub().returns({
        formatter: await simpleImport('@putout/formatter-json'),
        dir: '.',
        processors: [
            ['throw-processor', throwProcessor],
        ],
    });
    
    reRequire('@putout/engine-processor');
    
    mockRequire('./get-options', getOptions);
    
    reRequire('./runner/worker.js');
    reRequire('./runner/runner.js');
    
    const cli = reRequire('.');
    const log = stub();
    
    await runCli({
        cli,
        argv,
        log,
    });
    
    const [firstCall] = log.args;
    const [error] = firstCall;
    const {message} = error;
    
    stopAll();
    
    t.equal(message, 'preProcess');
    t.end();
});

test('putout: processor: invalid config', async (t) => {
    const argv = [
        __filename,
    ];
    
    const halt = stub();
    
    mockRequire('../../putout.json', {
        exclude: [
            '.md',
        ],
    });
    
    reRequire('../parse-options');
    reRequire('./get-options');
    
    const cli = reRequire('.');
    const log = stub();
    
    await runCli({
        halt,
        cli,
        argv,
        log,
    });
    
    stopAll();
    
    t.calledWith(halt, [INVALID_CONFIG]);
    t.end();
});

test('putout: processor: invalid config: message', async (t) => {
    const argv = [
        __filename,
        '-f',
        'dump',
    ];
    
    const logError = stub();
    
    mockRequire('../../putout.json', {
        exclude: [
            '.md',
        ],
    });
    
    reRequire('../parse-options');
    
    const getOptions = reRequire('./get-options');
    mockRequire('./get-options', (args) => {
        const {name} = args;
        
        if (/\.js$/.test(name))
            return getOptions(args);
        
        return {
            dir: __dirname,
            ignore: [],
        };
    });
    
    reRequire('@putout/engine-processor');
    reRequire('./runner/worker.js');
    reRequire('./runner/runner.js');
    
    const cli = reRequire('.');
    const log = stub();
    
    await runCli({
        logError,
        cli,
        argv,
        log,
    });
    
    stopAll();
    
    const [allArgCalls] = logError.args;
    const [arg] = allArgCalls;
    
    const stripAnsi = await simpleImport('strip-ansi');
    const result = stripAnsi(arg);
    const expected = '🐊 .putout.json: exclude: must NOT have additional properties';
    
    t.equal(result, expected);
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

