'use strict';

const {join} = require('path');

const test = require('supertape');
const stub = require('@cloudcmd/stub');
const mockRequire = require('mock-require');
const stripAnsi = require('strip-ansi');

const _cli = require('.');
const {version} = require('../../package');

const {reRequire, stopAll} = mockRequire;

test('putout: cli: --raw', (t) => {
    const logError = stub();
    const argv = [
        'xx',
        '--raw',
    ];
    
    const error = Error('No files matching the pattern "xx" were found');
    mockRequire('./get-files', stub().returns([error]));
    
    const cli = reRequire('.');
    
    runCli({
        cli,
        logError,
        argv,
    });
    
    stopAll();
    
    t.ok(logError.calledWith(error), 'should call logError');
    t.end();
});

test('putout: cli: --raw: parser error', (t) => {
    const logError = stub();
    const argv = [
        join(__dirname, 'fixture/parser-error.js'),
        '--raw',
        '--no-options',
        '--format',
        'none',
    ];
    
    const cli = reRequire('.');
    
    runCli({
        cli,
        logError,
        argv,
    });
    
    const error = SyntaxError('Unexpected token (2:0)');
    t.ok(logError.calledWith(error), 'should call logError');
    t.end();
});

test('putout: cli: --raw: halt', (t) => {
    const halt = stub();
    const argv = [
        'xx',
        '--raw',
    ];
    
    runCli({
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

test('putout: cli: get git names', (t) => {
    const logError = stub();
    const getGitNames = stub().returns(['./xxx.js']);
    const argv = [
        '--untracked',
    ];
    
    mockRequire('./get-git-names', getGitNames);
    
    const cli = reRequire('.');
    
    runCli({
        cli,
        argv,
        logError,
    });
    
    const [allArgCalls] = logError.args;
    const [arg] = allArgCalls;
    
    const output = stripAnsi(arg);
    const message = 'No files matching the pattern "./xxx.js" were found';
    
    t.equal(output, message, 'should equal');
    t.end();
});

test('putout: cli: ruler processor', (t) => {
    const logError = stub();
    const rullerProcessor = stub();
    const getRullerProcessor = stub().returns(rullerProcessor);
    const argv = [
        '--enable-all',
        __filename,
    ];
    
    mockRequire('./ruler-processor', getRullerProcessor);
    
    const cli = reRequire('.');
    
    runCli({
        cli,
        argv,
        logError,
    });
    
    t.ok(rullerProcessor.called);
    t.end();
});

function runCli(options) {
    const {
        halt = stub(),
        log = stub(),
        logError = stub(),
        write = stub(),
        argv = [],
        cli = _cli,
    } = options;
    
    cli({
        write,
        halt,
        log,
        logError,
        argv,
    });
}

