'use strict';

const test = require('supertape');
const stub = require('@cloudcmd/stub');
const mockRequire = require('mock-require');

const cli = require('.');
const {version} = require('../../package');

const {reRequire} = mockRequire;

test('putout: cli: --raw', (t) => {
    const halt = stub();
    const log = stub();
    const logError = stub();
    const argv = [
        'xx',
        '--raw',
    ];
    
    const error = Error('No files matching the pattern "xx" were found');
    mockRequire('./get-files', stub().returns([error]));
    
    const cli = reRequire('.');
    
    cli({
        halt,
        log,
        logError,
        argv,
    });
    
    t.ok(logError.calledWith(error), 'should call logError');
    t.end();
});

test('putout: cli: --raw: halt', (t) => {
    const halt = stub();
    const log = stub();
    const logError = stub();
    const argv = [
        'xx',
        '--raw',
    ];
    
    cli({
        halt,
        log,
        logError,
        argv,
    });
    
    t.ok(halt.calledWith(1), 'should call halt');
    t.end();
});

test('putout: cli: --version', (t) => {
    const halt = stub();
    const log = stub();
    const logError = stub();
    const argv = [
        '--version',
    ];
    
    cli({
        halt,
        log,
        logError,
        argv,
    });
    
    const expected = `v${version}`;
    
    t.ok(log.calledWith(expected), 'should call halt');
    t.end();
});

test('putout: cli: -v', (t) => {
    const halt = stub();
    const log = stub();
    const logError = stub();
    const argv = [
        '-v',
    ];
    
    cli({
        halt,
        log,
        logError,
        argv,
    });
    
    const expected = `v${version}`;
    
    t.ok(log.calledWith(expected), 'should call halt');
    t.end();
});

