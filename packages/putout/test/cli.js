'use strict';

const {join} = require('path');

const test = require('supertape');
const runsome = require('runsome');
const stripAnsi = require('strip-ansi');

const cliPath = join(__dirname, '../bin/putout.js');
const run = runsome(cliPath);

test('putout: cli: -v', (t) => {
    const result = run('-v');
    const {version} = require('../package');
    const expected = `v${version}`;
    
    t.equal(result, expected);
    t.end();
});

test('putout: cli: --version', (t) => {
    const result = run('--version');
    const {version} = require('../package');
    const expected = `v${version}`;
    
    t.equal(result, expected);
    t.end();
});

test('putout: cli: -h', (t) => {
    const result = run('-h');
    const help = require('../lib/help');
    const expected = help();
    
    t.equal(result, expected);
    t.end();
});

test('putout: cli: --help', (t) => {
    const result = run('--help');
    const help = require('../lib/help');
    const expected = help();
    
    t.equal(result, expected);
    t.end();
});

test('putout: cli: no files found', (t) => {
    const result = stripAnsi(run('abc'));
    const expected = 'No files matching the pattern "abc" were found';
    
    t.equal(result, expected);
    t.end();
});

