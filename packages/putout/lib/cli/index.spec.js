'use strict';

const {join} = require('path');

const test = require('supertape');
const stub = require('@cloudcmd/stub');
const mockRequire = require('mock-require');
const stripAnsi = require('strip-ansi');

const _cli = require('.');
const {version} = require('../../package');

const {reRequire, stopAll} = mockRequire;

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
        '.xjs',
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
    
    t.ok(add.calledWith('.xjs'), 'should call logError');
    t.end();
});

test('putout: cli: multiple --ext', async (t) => {
    const argv = [
        '--ext',
        '.xjs',
        '--ext',
        '.extjs',
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
    
    t.ok(add.calledWith(['.xjs', '.extjs']), 'should call logError');
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

test('putout: cli: --raw: parser error', async (t) => {
    const logError = stub();
    const argv = [
        join(__dirname, 'fixture/parser-error.js'),
        '--raw',
        '--no-options',
        '--format',
        'none',
    ];
    
    reRequire('./get-files');
    reRequire('./process-file');
    const cli = reRequire('.');
    
    await runCli({
        cli,
        logError,
        argv,
    });
    
    const error = SyntaxError('Unexpected token (2:0)');
    t.ok(logError.calledWith(error), 'should call logError');
    t.end();
});

test('putout: cli: --format: specified twice', async (t) => {
    const logError = stub();
    const argv = [
        join(__dirname, 'fixture/parser-error.js'),
        '--raw',
        '--no-options',
        '--format',
        'dump',
        '--format',
        'none',
    ];
    
    reRequire('./get-files');
    reRequire('./process-file');
    const cli = reRequire('.');
    
    await runCli({
        cli,
        logError,
        argv,
    });
    
    const error = SyntaxError('Unexpected token (2:0)');
    t.ok(logError.calledWith(error), 'should call logError');
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
    
    t.ok(halt.calledWith(1), 'should call halt');
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

test('putout: cli: --fix --staged', async (t) => {
    const name = './xxx.js';
    const logError = stub();
    const get = stub().returns([
        name,
    ]);
    const set = stub();
    const argv = [
        '--staged',
        '--fix',
    ];
    
    const getFiles = stub().returns([null, [
        name,
    ]]);
    
    const process = stub().returns([]);
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

test('putout: cli: --staged --fix', async (t) => {
    const logError = stub();
    const get = stub().returns(['./xxx.js']);
    const set = stub();
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

test('putout: cli: ruler processor: --eneable-all', async (t) => {
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
        '--no-options',
        join(__dirname, 'fixture', 'view.tsx'),
    ];
    
    const cli = reRequire('.');
    
    await runCli({
        cli,
        write,
        argv,
    });
    
    t.ok(write.calledWith(''), 'should call logError');
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
    } = options;
    
    await cli({
        write,
        halt,
        log,
        logError,
        argv,
    });
}

