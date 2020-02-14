'use strict';

const test = require('supertape');
const stub = require('@cloudcmd/stub');
const mockRequire = require('mock-require');

const cli = require('.');
const {version} = require('../../package');

const {reRequire} = mockRequire;

test('putout: cli: --raw', (t) => {
    const halt = stub();
    const write = stub();
    const writeError = stub();
    const argv = [
        'xx',
        '--raw',
    ];
    
    const error = Error('No files matching the pattern "xx" were found');
    mockRequire('./get-files', stub().returns([error]));
    
    const cli = reRequire('.');
    
    cli({
        halt,
        write,
        writeError,
        argv,
    });
    
    t.ok(writeError.calledWith(error), 'should call writeError');
    t.end();
});

test('putout: cli: --raw: halt', (t) => {
    const halt = stub();
    const write = stub();
    const writeError = stub();
    const argv = [
        'xx',
        '--raw',
    ];
    
    cli({
        halt,
        write,
        writeError,
        argv,
    });
    
    t.ok(halt.calledWith(1), 'should call halt');
    t.end();
});

test('putout: cli: --version', (t) => {
    const halt = stub();
    const write = stub();
    const writeError = stub();
    const argv = [
        '--version',
    ];
    
    cli({
        halt,
        write,
        writeError,
        argv,
    });
    
    const expected = `v${version}`;
    
    t.ok(write.calledWith(expected), 'should call halt');
    t.end();
});

test('putout: cli: -v', (t) => {
    const halt = stub();
    const write = stub();
    const writeError = stub();
    const argv = [
        '-v',
    ];
    
    cli({
        halt,
        write,
        writeError,
        argv,
    });
    
    const expected = `v${version}`;
    
    t.ok(write.calledWith(expected), 'should call halt');
    t.end();
});

