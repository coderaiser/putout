import {stripVTControlCharacters} from 'node:util';
import process from 'node:process';
import {
    join,
    basename,
    dirname,
} from 'node:path';
import {readFile} from 'node:fs/promises';
import {EventEmitter} from 'node:events';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
import {test, stub} from 'supertape';
import {tryCatch} from 'try-catch';
import {tryToCatch} from 'try-to-catch';
import formatterJSON from '@putout/formatter-json';
import {parseOptions} from '#parse-options';
import {simpleImport as _simpleImport} from './simple-import.js';
import {red} from './chalk.js';
import cli from './index.js';

const require = createRequire(import.meta.url);
const {version} = require('../../package');

const {
    OK,
    PLACE,
    NO_FILES,
    NO_PROCESSORS,
    WAS_STOP,
    INVALID_OPTION,
    CANNOT_LOAD_PROCESSOR,
    RULER_WITH_FIX,
    INVALID_CONFIG,
    CANNOT_LINT_STAGED,
    INTERACTIVE_CANCELED,
    STAGE,
} = require('./exit-codes');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const noop = () => {};
const {env} = process;
const {assign} = Object;
const {parse} = JSON;

test('putout: cli: --raw', async (t) => {
    const logError = stub();
    const argv = [
        'xx',
        '--raw',
    ];
    
    const error = Error('No files matching the pattern "xx" were found');
    
    const getFiles = stub().returns([error]);
    
    await runCli({
        getFiles,
        logError,
        argv,
    });
    
    t.calledWith(logError, [error], 'should call logError');
    t.end();
});

test('putout: cli: --raw: PUTOUT_FILES', async (t) => {
    process.env.PUTOUT_FILES = 'xx';
    
    const logError = stub();
    const argv = ['--raw'];
    const error = Error('No files matching the pattern "xx" were found');
    
    const getFiles = stub().returns([error]);
    
    await runCli({
        logError,
        argv,
        getFiles,
    });
    
    delete process.env.PUTOUT_FILES;
    
    t.calledWith(logError, [error], 'should call logError');
    t.end();
});

test('putout: cli: --raw: parse error', async (t) => {
    const logError = stub();
    const argv = [
        new URL('fixture/parse-error.js', import.meta.url).pathname,
        '--raw',
        '--no-config',
        '--format',
        'none',
        '--no-ci',
        '--no-cache',
    ];
    
    await runCli({
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
    const argv = [__filename, '--no-config', '--ci'];
    
    const process = stub().returns({
        places: [{
            rule: 'variables/remove-unused',
            message: 'hello',
            position: {
                line: 1,
                column: 1,
            },
        }],
        code: '',
    });
    
    const initProcessFile = stub().returns(process);
    const getFormatter = stub().returns(['dump', {}]);
    const initReport = stub().returns(stub);
    
    await runCli({
        argv,
        isCI: true,
        initReport,
        getFormatter,
        initProcessFile,
    });
    
    t.calledWith(getFormatter, ['stream', stub()]);
    t.end();
});

test('putout: cli: -i', async (t) => {
    const argv = [
        '--no-config',
        '-i',
    ];
    
    const process = stub().returns({
        places: [{
            rule: 'variables/remove-unused',
            message: 'hello',
            position: {
                line: 1,
                column: 1,
            },
        }],
        code: '',
    });
    
    const initProcessFile = stub().returns(process);
    const getFormatter = stub().returns(['dump', {}]);
    const initReport = stub().returns(stub);
    
    const chooseFormatter = stub().resolves(['hello']);
    
    const simpleImport = async (path) => {
        if (path === '@putout/cli-choose-formatter')
            return {
                chooseFormatter,
            };
        
        return await _simpleImport(path);
    };
    
    await runCli({
        argv,
        simpleImport,
        initReport,
        getFormatter,
        initProcessFile,
    });
    
    t.calledWith(getFormatter, ['hello', stub()]);
    t.end();
});

test('putout: cli: -i: cancel', async (t) => {
    const argv = [
        '--no-config',
        '-i',
    ];
    
    const getFormatter = stub().returns(['dump', {}]);
    const initReport = stub().returns(stub);
    const chooseFormatter = stub().resolves('');
    
    const simpleImport = async (path) => {
        if (path === '@putout/cli-choose-formatter')
            return {
                chooseFormatter,
            };
        
        return await _simpleImport(path);
    };
    
    const halt = stub();
    
    await runCli({
        argv,
        halt,
        getFormatter,
        initReport,
        simpleImport,
    });
    
    t.calledWith(halt, [INTERACTIVE_CANCELED]);
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
    
    const initProcessFile = stub().returns(process);
    const initReport = stub().returns(stub);
    const getFormatter = stub().returns(['dump', {}]);
    
    await runCli({
        argv,
        initProcessFile,
        initReport,
        getFormatter,
    });
    
    const [arg] = getFormatter.args;
    const [first] = arg;
    
    t.equal(first, 'none', 'should use last passed formatter');
    t.end();
});

test('putout: cli: no ide', async (t) => {
    const name = basename(__filename);
    const argv = [name, '--fresh'];
    
    const processFile = stub().returns({
        places: [],
        code: '',
    });
    
    const getFormatter = stub().returns(['dump', {}]);
    const report = stub();
    
    const getFiles = stub().returns([
        null,
        [name],
    ]);
    
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
    
    const initProcessFile = stub().returns(processFile);
    const initReport = stub().returns(report);
    
    const cliCache = {
        createCache,
    };
    
    const {
        TERMINAL_EMULATOR,
        TERM_PROGRAM,
    } = env;
    
    delete env.TERMINAL_EMULATOR;
    delete env.TERM_PROGRAM;
    
    await runCli({
        argv,
        cliCache,
        getFiles,
        getFormatter,
        initReport,
        initProcessFile,
    });
    
    env.TERMINAL_EMULATOR = TERMINAL_EMULATOR;
    env.TERM_PROGRAM = TERM_PROGRAM;
    
    const expected = ['dump', {
        count: 1,
        formatterOptions: {},
        index: 0,
        name,
        places: [],
        source: '',
        trace: noop,
    }];
    
    t.calledWith(report, expected);
    t.end();
});

test('putout: cli: ide: web storm', async (t) => {
    const name = basename(__filename);
    const argv = [name, '--fresh'];
    const {TERMINAL_EMULATOR} = process.env;
    
    process.env.TERMINAL_EMULATOR = 'JetBrains-JediTerm';
    
    const processFile = stub().returns({
        places: [],
        code: '',
    });
    
    const getFormatter = stub().returns(['dump', {}]);
    const report = stub();
    
    const getFiles = stub().returns([
        null,
        [name],
    ]);
    
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
    
    const initProcessFile = stub().returns(processFile);
    const initReport = stub().returns(report);
    
    const cliCache = {
        createCache,
    };
    
    await runCli({
        getFormatter,
        getFiles,
        cliCache,
        argv,
        initReport,
        initProcessFile,
    });
    
    process.env.TERMINAL_EMULATOR = TERMINAL_EMULATOR;
    
    const expected = ['dump', {
        count: 1,
        formatterOptions: {},
        index: 0,
        name: join(process.cwd(), name),
        places: [],
        source: '',
        trace: noop,
    }];
    
    t.calledWith(report, expected);
    t.end();
});

test('putout: cli: ide: vs code', async (t) => {
    const name = basename(__filename);
    const argv = [name, '--fresh'];
    const {TERM_PROGRAM} = process.env;
    
    process.env.TERM_PROGRAM = 'vscode';
    
    const processFile = stub().returns({
        places: [],
        code: '',
    });
    
    const getFormatter = stub().returns(['dump', {}]);
    
    const report = stub();
    
    const getFiles = stub().returns([
        null,
        [name],
    ]);
    
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
    
    const initProcessFile = stub().returns(processFile);
    const initReport = stub().returns(report);
    
    const cliCache = {
        createCache,
    };
    
    await runCli({
        cliCache,
        getFiles,
        getFormatter,
        argv,
        initReport,
        initProcessFile,
    });
    
    process.env.TERM_PROGRAM = TERM_PROGRAM;
    
    const expected = ['dump', {
        count: 1,
        formatterOptions: {},
        index: 0,
        name: join(process.cwd(), name),
        places: [],
        source: '',
        trace: noop,
    }];
    
    t.calledWith(report, expected);
    t.end();
});

test('putout: cli: ide: vs code: cache', async (t) => {
    const name = basename(__filename);
    const argv = [name, '--cache'];
    
    const {TERM_PROGRAM} = process.env;
    
    process.env.TERM_PROGRAM = 'vscode';
    
    const processFile = stub().returns({
        places: [],
        code: '',
    });
    
    const initProcessFile = stub().returns(processFile);
    
    const getFormatter = stub().returns(['dump', {}]);
    const report = stub();
    
    const getFiles = stub().returns([
        null,
        [name],
    ]);
    
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
    
    const initReport = stub().returns(report);
    
    const cliCache = {
        createCache,
    };
    
    await runCli({
        argv,
        cliCache,
        getFiles,
        initReport,
        initProcessFile,
        getFormatter,
    });
    
    process.env.TERM_PROGRAM = TERM_PROGRAM;
    
    const expected = ['dump', {
        count: 1,
        formatterOptions: {},
        index: 0,
        name: join(process.cwd(), name),
        places: [],
        source: '',
        trace: noop,
    }];
    
    t.calledWith(report, expected);
    t.end();
});

test('putout: cli: no ide: cache', async (t) => {
    const name = basename(__filename);
    const argv = [name, '--cache'];
    const {TERMINAL_EMULATOR} = process.env;
    
    process.env.TERMINAL_EMULATOR = 'none';
    
    const processFile = stub().returns({
        places: [],
        code: '',
    });
    
    const initProcessFile = stub().returns(processFile);
    
    const getFormatter = stub().returns(['dump', {}]);
    const report = stub();
    
    const getFiles = stub().returns([
        null,
        [name],
    ]);
    
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
    
    const initReport = stub().returns(report);
    
    const cliCache = {
        createCache,
    };
    
    await runCli({
        argv,
        cliCache,
        initProcessFile,
        getFiles,
        getFormatter,
        initReport,
    });
    
    process.env.TERMINAL_EMULATOR = TERMINAL_EMULATOR;
    
    const expected = ['dump', {
        count: 1,
        formatterOptions: {},
        index: 0,
        name,
        places: [],
        source: '',
        trace: noop,
    }];
    
    t.calledWith(report, expected);
    t.end();
});

test('putout: cli: --fresh', async (t) => {
    const file = new URL('fixture/parse-error.js', import.meta.url).pathname;
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
        processors: ['javascript'],
    });
    
    const cliCache = {
        createCache,
    };
    
    await runCli({
        argv,
        getOptions,
        cliCache,
    });
    
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
    
    const argv = ['--version'];
    
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
    
    const argv = ['-v'];
    
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
    
    t.notCalled(log, 'should not call log');
    t.end();
});

test('putout: cli: --fix --staged: set', async (t) => {
    const name = './xxx.js';
    const logError = stub();
    
    const get = stub().returns([name]);
    const set = stub().returns(['hello.txt']);
    
    const argv = [
        '--staged',
        '--fix',
        '--no-cache',
    ];
    
    const getFiles = stub().returns([
        null,
        [name],
    ]);
    
    const process = stub().returns({
        places: [],
        code: '',
    });
    
    const initProcessFile = stub().returns(process);
    
    const cliStaged = {
        get,
        set,
    };
    
    await runCli({
        argv,
        logError,
        getFiles,
        initProcessFile,
        cliStaged,
    });
    
    const {findUp} = await import('find-up');
    
    t.calledWith(set, [{
        findUp,
    }]);
    t.end();
});

test('putout: cli: --fix --staged: get', async (t) => {
    const name = './xxx.js';
    const logError = stub();
    
    const get = stub().returns([name]);
    const set = stub().returns(['hello.txt']);
    
    const argv = [
        '--staged',
        '--fix',
        '--no-cache',
    ];
    
    const getFiles = stub().returns([
        null,
        [name],
    ]);
    
    const process = stub().returns({
        places: [],
        code: '',
    });
    
    const initProcessFile = stub().returns(process);
    const {isSupported} = require('./supported-files');
    
    const cliStaged = {
        get,
        set,
    };
    
    await runCli({
        argv,
        logError,
        getFiles,
        cliStaged,
        initProcessFile,
    });
    
    const {findUp} = await import('find-up');
    
    t.calledWith(get, [{
        findUp,
        isSupported,
    }]);
    t.end();
});

test('putout: cli: --fix --staged: exit code', async (t) => {
    const name = './xxx.js';
    const logError = stub();
    const halt = stub();
    
    const get = stub().returns([name]);
    const set = stub().returns([]);
    
    const argv = [
        '--staged',
        '--fix',
    ];
    
    const getFiles = stub().returns([
        null,
        [name],
    ]);
    
    const process = stub().returns({
        places: [],
        code: '',
    });
    
    const initProcessFile = stub().returns(process);
    const {_defaultCache} = await import('@putout/cli-cache');
    const createCache = stub().returns(_defaultCache);
    
    const cliCache = {
        createCache,
    };
    
    const cliStaged = {
        get,
        set,
    };
    
    await runCli({
        halt,
        argv,
        logError,
        getFiles,
        
        initProcessFile,
        cliCache,
        cliStaged,
    });
    
    t.calledWith(halt, [STAGE]);
    t.end();
});

test('putout: cli: --staged --fix', async (t) => {
    const logError = stub();
    const get = stub().returns(['./xxx.js']);
    const set = stub().returns(['hello.txt']);
    
    const argv = [
        '--staged',
        '--fix',
    ];
    
    const cliStaged = {
        get,
        set,
    };
    
    await runCli({
        argv,
        logError,
        cliStaged,
    });
    
    const [allArgCalls] = logError.args;
    const [arg] = allArgCalls;
    
    const output = stripVTControlCharacters(arg);
    const message = `🐊 No files matching the pattern './xxx.js' were found`;
    
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
        
        return await import(url);
    };
    
    await runCli({
        argv,
        logError,
        readFile,
        writeFile,
        simpleImport,
    });
    
    const places = [];
    
    const args = {
        disable: '',
        enable: 'convert-index-of-to-includes',
        readFile,
        writeFile,
    };
    
    t.calledWith(ruler, [places, args]);
    t.end();
});

test('putout: cli: ruler: --enable-all', async (t) => {
    const logError = stub();
    const ruler = stub();
    
    const argv = ['--enable-all', __filename];
    
    const simpleImport = async (url) => {
        if (url.includes('ruler'))
            return {
                ruler,
            };
        
        return await import(url);
    };
    
    await runCli({
        argv,
        logError,
        simpleImport,
    });
    
    t.ok(ruler.called);
    t.end();
});

test('putout: cli: ruler processor: --disable-all', async (t) => {
    const name = new URL('fixture/plugins.js', import.meta.url).pathname;
    const logError = stub();
    
    const argv = ['--disable-all', name];
    
    const rulerError = Error('should call ruler with await');
    const ruler = stub().rejects(rulerError);
    
    const simpleImport = async (url) => {
        if (url.includes('ruler'))
            return {
                ruler,
            };
        
        if (url === './exit.js')
            return await import(url);
        
        if (url.includes('processor'))
            return await import(url);
        
        return _simpleImport(url);
    };
    
    const [error] = await tryToCatch(runCli, {
        argv,
        logError,
        simpleImport,
    });
    
    t.equal(error, rulerError);
    t.end();
});

test('putout: cli: ruler processor: --enable-all: no path', async (t) => {
    const logError = stub();
    
    const argv = [
        '--enable-all',
    ];
    
    await tryToCatch(runCli, {
        cli,
        argv,
        logError,
    });
    
    const expected = red('🐊 `path` is missing for ruler toggler (`--enable-all`, `--disable-all`)');
    
    t.calledWith(logError, [expected]);
    t.end();
});

test('putout: cli: ruler processor: --enable-all: no path: code', async (t) => {
    const name = new URL('fixture/plugins.js', import.meta.url).pathname;
    const logError = stub();
    
    const argv = [
        '--enable-all',
        '--fix',
        name,
    ];
    
    const halt = stub();
    
    await tryToCatch(runCli, {
        cli,
        argv,
        logError,
        halt,
    });
    
    t.calledWith(halt, [RULER_WITH_FIX]);
    t.end();
});

test('putout: cli: ruler processor: --enable-all --fix: code', async (t) => {
    const name = new URL('fixture/plugins.js', import.meta.url).pathname;
    const logError = stub();
    
    const argv = [
        '--enable-all',
        '--fix',
        name,
    ];
    
    const halt = stub();
    
    await tryToCatch(runCli, {
        cli,
        argv,
        logError,
        halt,
    });
    
    t.calledWith(halt, [RULER_WITH_FIX]);
    t.end();
});

test('putout: cli: ruler processor: --enable --fix: log', async (t) => {
    const name = new URL('fixture/plugins.js', import.meta.url).pathname;
    const logError = stub();
    
    const argv = [
        '--enable',
        'hello',
        '--fix',
        name,
    ];
    
    await tryToCatch(runCli, {
        cli,
        argv,
        logError,
    });
    
    const expected = red(`🐊 '--fix' cannot be used with ruler toggler ('--enable', '--disable')`);
    
    t.calledWith(logError, [expected]);
    t.end();
});

test('putout: cli: ruler processor: --enable-all --fix', async (t) => {
    const name = new URL('fixture/plugins.js', import.meta.url).pathname;
    const logError = stub();
    
    const argv = [
        '--enable-all',
        '--fix',
        name,
    ];
    
    const halt = stub();
    
    await tryToCatch(runCli, {
        cli,
        argv,
        logError,
        halt,
    });
    
    t.calledWith(halt, [RULER_WITH_FIX]);
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
    
    const processFiles = stub().returns({
        code: '',
        places: [],
    });
    
    const initProcessFiles = stub().returns(processFiles);
    
    const getOptions = stub().returns({
        dir: '.',
        formatter: 'dump',
        processors: ['javascript'],
    });
    
    await runCli({
        write,
        argv,
        initProcessFiles,
        getOptions,
    });
    
    t.calledWith(write, [''], 'should call logError');
    t.end();
});

test('putout: cli: d.ts', async (t) => {
    const name = join(__dirname, 'fixture', 'types.d.ts');
    const halt = stub();
    
    const argv = [name];
    const options = parseOptions({
        name,
    });
    
    assign(options, {
        ignore: [],
    });
    
    const getOptions = stub().returns(options);
    
    await runCli({
        halt,
        argv,
        readFile,
        getOptions,
    });
    
    t.calledWith(halt, [OK]);
    t.end();
});

test('putout: cli: --transform', async (t) => {
    const write = stub();
    
    const name = new URL('fixture/transform.js', import.meta.url).pathname;
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
    
    await runCli({
        argv,
        write,
        readFile,
    });
    
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
    
    const name = new URL('fixture/plugins.js', import.meta.url).pathname;
    const source = await readFile(name, 'utf8');
    
    const argv = [
        name,
        '--plugins',
        'variables,remove-debugger',
        '--no-config',
        '--format',
        'json',
        '--no-ci',
        '--no-cache',
    ];
    
    await runCli({
        argv,
        write,
        readFile,
    });
    
    const expected = {
        errors: [{
            name,
            source,
            places: [{
                rule: 'variables/remove-unused',
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
    
    const initProcessFile = stub().returns(process);
    const writeFile = stub();
    
    const getOptions = stub().returns({
        dir: __dirname,
        formatter: 'dump',
        processors: ['javascript'],
    });
    
    await runCli({
        argv,
        writeFile,
        getOptions,
        initProcessFile,
    });
    
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
    const initProcessFile = stub().returns(process);
    
    const getOptions = stub().returns({
        dir: __dirname,
        formatter: 'dump',
        processors: [],
    });
    
    await runCli({
        argv,
        halt,
        initProcessFile,
        getOptions,
    });
    
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
        processors: [],
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
    
    const processor = {
        runProcessors,
        getFilePatterns,
    };
    
    await runCli({
        argv,
        processor,
        fileCache,
        getOptions,
    });
    
    t.notCalled(setInfo, 'should not call fileCache.setInfo');
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
        processors: [],
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
    
    const processor = {
        runProcessors,
        getFilePatterns,
    };
    
    await runCli({
        argv,
        getOptions,
        fileCache,
        processor,
    });
    
    t.notCalled(setInfo, 'should not call fileCache.setInfo');
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
    
    const simpleImport = (name) => {
        if (name === '@putout/cli-cache')
            return {
                createCache,
            };
        
        return _simpleImport(name);
    };
    
    await runCli({
        argv,
        getOptions,
        simpleImport,
    });
    
    const expected = [__filename, options];
    
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
    
    const name = new URL('./fixture/parse-error.js', import.meta.url).pathname;
    const source = await readFile(name, 'utf8');
    
    const readFileStub = stub().returns(source);
    
    await runCli({
        argv,
        halt,
        readFile: readFileStub,
        getOptions,
    });
    
    t.calledWith(halt, [PLACE]);
    t.end();
});

test('putout: cli: readFile: ENOENT', async (t) => {
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
    
    const error = Error('No file found');
    
    error.code = 'ENOENT';
    const readFileStub = stub().throws(error);
    
    await runCli({
        argv,
        halt,
        readFile: readFileStub,
        getOptions,
    });
    
    t.calledWith(halt, [OK]);
    t.end();
});

test('putout: cli: readFile: EACCESS', async (t) => {
    const argv = [
        __filename,
        '--no-config',
        '--no-ci',
        '--no-cache',
        '-f',
        'json-lines',
    ];
    
    const halt = stub();
    
    const getOptions = stub().returns({
        dir: __dirname,
        formatter: 'dump',
    });
    
    const write = stub();
    const error = Error('Access Denied');
    
    error.code = 'EACCESS';
    const readFileStub = stub().throws(error);
    
    await runCli({
        argv,
        halt,
        readFile: readFileStub,
        write,
        getOptions,
    });
    
    const expected = {
        name: __filename,
        places: [{
            rule: 'system',
            message: 'Access Denied',
            position: {
                line: 1,
                column: 0,
            },
        }],
        index: 0,
        count: 1,
        filesCount: 1,
        errorsCount: 1,
    };
    
    const [arg] = write.args[0];
    const result = parse(arg);
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: cli: get files: called with ignore option', async (t) => {
    const argv = [__filename, '--no-ci', '--no-cache'];
    const ignore = ['xxx'];
    
    const getOptions = stub().returns({
        dir: __dirname,
        formatter: 'dump',
        ignore,
    });
    
    const getFiles = stub().returns(['dir', []]);
    
    await runCli({
        argv,
        getOptions,
        getFiles,
    });
    
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
    
    const getFiles = stub().returns([
        null,
        [__filename, __filename],
    ]);
    
    const halt = stub();
    const isStop = stub().returns(true);
    
    const keypress = stub().returns({
        isStop,
    });
    
    await runCli({
        argv,
        halt,
        keypress,
        getOptions,
        getFiles,
    });
    
    t.calledWith(halt, [WAS_STOP], 'should set WAS_STOP status');
    t.end();
});

test('putout: cli: get files: was stop: no', async (t) => {
    const argv = [__filename, '--no-cache', '--no-config'];
    const ignore = ['xxx'];
    const getOptions = stub().returns({
        dir: __dirname,
        formatter: 'dump',
        ignore,
    });
    
    const getFiles = stub().returns([
        null,
        [__filename],
    ]);
    
    const halt = stub();
    
    await runCli({
        argv,
        halt,
        getFiles,
        getOptions,
    });
    
    t.calledWith(halt, [OK], 'should set OK status');
    t.end();
});

test('putout: cli: get files: was stop: isStop passed', async (t) => {
    const argv = [__filename, '--no-cache', '--no-config'];
    
    const ignore = ['xxx'];
    
    const getOptions = stub().returns({
        dir: __dirname,
        formatter: 'dump',
        ignore,
    });
    
    const getFiles = stub().returns([
        null,
        [__filename],
    ]);
    
    const halt = stub();
    const isStop = stub().returns(false);
    
    const onHalt = stub().returns({
        isStop,
    });
    
    await runCli({
        argv,
        halt,
        isStop,
        getFiles,
        getOptions,
        onHalt,
    });
    
    t.calledWith(halt, [OK], 'should set OK status');
    t.end();
});

test('putout: cli: invalid option', async (t) => {
    const argv = [
        '--hello-world',
    ];
    
    const halt = stub();
    
    await runCli({
        cli,
        argv,
        halt,
    });
    
    t.calledWith(halt, [INVALID_OPTION], 'should exit with INVALID_OPTION code');
    t.end();
});

test('putout: cli: --staged: error code', async (t) => {
    const argv = ['--staged'];
    
    const halt = stub();
    const get = stub().rejects('not git repository');
    
    const cliStaged = {
        get,
    };
    
    await runCli({
        argv,
        halt,
        cliStaged,
    });
    
    t.calledWith(halt, [CANNOT_LINT_STAGED]);
    t.end();
});

test('putout: cli: --staged: error message', async (t) => {
    const argv = ['--staged'];
    
    const halt = stub();
    const get = stub().rejects(Error('not git repository'));
    const logError = stub();
    
    const cliStaged = {
        get,
    };
    
    await runCli({
        argv,
        halt,
        logError,
        cliStaged,
    });
    
    const expected = red('🐊 --staged: not git repository');
    
    t.calledWith(logError, [expected]);
    t.end();
});

test('putout: cli: invalid option: message', async (t) => {
    const argv = [
        '--hello-world',
    ];
    
    const logError = stub();
    
    await runCli({
        cli,
        argv,
        logError,
    });
    
    const expected = red('🐊 Invalid option `--hello-world`. Perhaps you meant `--help`');
    
    t.calledWith(logError, [expected], 'should show message about invalid option');
    t.end();
});

test('putout: cli: invalid option: message: one char', async (t) => {
    const argv = ['-z'];
    const logError = stub();
    
    await runCli({
        cli,
        argv,
        logError,
    });
    
    const expected = red(`🐊 Invalid option '-z'`);
    
    t.calledWith(logError, [expected], 'should show message about invalid option');
    t.end();
});

test('putout: cli: cannot load processor', async (t) => {
    const argv = [];
    const halt = stub();
    
    const getOptions = stub().returns({
        formatter: 'dump',
        dir: '.',
        processors: ['javascript', 'hello'],
    });
    
    await runCli({
        argv,
        halt,
        getOptions,
    });
    
    t.calledWith(halt, [CANNOT_LOAD_PROCESSOR], 'should exit with CANNOT_LOAD_PROCESSOR code');
    t.end();
});

test('putout: cli: cannot load processor: not found', async (t) => {
    const argv = [];
    
    const logError = stub();
    const getProcessorRunners = stub().rejects(Error(`Processor "putout-processor-hello" could not be found!`));
    
    const processor = {
        getProcessorRunners,
    };
    
    await runCli({
        argv,
        logError,
        processor,
    });
    
    const expected = red(`🐊 Processor "putout-processor-hello" could not be found!`);
    
    t.calledWith(logError, [expected], 'should show message about invalid option');
    t.end();
});

test('putout: cli: addOnce', (t) => {
    const fn = stub();
    const {_addOnce} = require('./index.js');
    const emitter = new EventEmitter();
    
    _addOnce(emitter, 'hello', fn);
    _addOnce(emitter, 'hello', fn);
    
    const result = emitter.listenerCount('hello');
    
    t.equal(result, 1);
    t.end();
});

test('putout: processor throw', async (t) => {
    const file = new URL('fixture/processor.throw', import.meta.url).pathname;
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
        formatter: formatterJSON,
        dir: '.',
        processors: [
            ['throw-processor', throwProcessor],
        ],
    });
    
    const write = stub();
    
    await runCli({
        write,
        argv,
        getOptions,
    });
    
    const {places} = parse(write.args[0]);
    const [{rule}] = places;
    
    t.equal(rule, 'parser');
    t.end();
});

test('putout: processor throw: raw', async (t) => {
    const file = new URL('fixture/processor.throw', import.meta.url).pathname;
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
        formatter: formatterJSON,
        dir: '.',
        processors: [
            ['throw-processor', throwProcessor],
        ],
    });
    
    const log = stub();
    
    await runCli({
        argv,
        log,
        getOptions,
    });
    
    const [firstCall] = log.args;
    const [error] = firstCall;
    const {message} = error;
    
    t.equal(message, 'preProcess');
    t.end();
});

test('putout: processor: invalid config', async (t) => {
    const argv = [__filename];
    const halt = stub();
    
    const getOptions = stub().throws(Error('invalid config'));
    
    const log = stub();
    
    await runCli({
        halt,
        argv,
        log,
        getOptions,
    });
    
    t.calledWith(halt, [INVALID_CONFIG]);
    t.end();
});

test('putout: processor: invalid config: message', async (t) => {
    const argv = [__filename, '-f', 'dump'];
    const logError = stub();
    
    const getOptions = stub().throws(Error('invalid config'));
    const log = stub();
    
    await runCli({
        logError,
        argv,
        log,
        getOptions,
    });
    
    const [allArgCalls] = logError.args;
    const [arg] = allArgCalls;
    
    const result = stripVTControlCharacters(arg);
    const expected = '🐊 invalid config';
    
    t.equal(result, expected);
    t.end();
});

async function runCli(options) {
    const {
        isStop,
        halt = stub(),
        log = stub(),
        logError = stub(),
        write = stub(),
        argv = [],
        readFile = stub().returns(''),
        writeFile = stub(),
        keypress,
        getOptions,
        getFiles,
        cliStaged,
        cliCache,
        initProcessFile,
        getFormatter,
        initReport,
        onHalt,
        isCI,
        simpleImport,
        processor,
    } = options;
    
    await cli({
        write,
        halt,
        log,
        logError,
        argv,
        readFile,
        writeFile,
        isStop,
        keypress,
        getOptions,
        getFiles,
        cliStaged,
        cliCache,
        initProcessFile,
        getFormatter,
        initReport,
        onHalt,
        isCI,
        simpleImport,
        processor,
    });
}
