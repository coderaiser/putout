'use strict';

const {join} = require('path');

const test = require('supertape');
const stub = require('@cloudcmd/stub');
const mockRequire = require('mock-require');

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

