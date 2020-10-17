'use strict';

const {join} = require('path');

const test = require('supertape');
const runsome = require('./runsome');
const stripAnsi = require('strip-ansi');

const cliPath = join(__dirname, '../bin/putout.js');
const run = runsome(cliPath);

test('putout: cli: -v', async (t) => {
    const {stdout} = await run('-v');
    const {version} = require('../package');
    const expected = `v${version}`;
    
    t.equal(stdout, expected);
    t.end();
});

test('putout: cli: --version', async (t) => {
    const {stdout} = await run('--version');
    const {version} = require('../package');
    const expected = `v${version}`;
    
    t.equal(stdout, expected);
    t.end();
});

test('putout: cli: -h', async (t) => {
    const {stdout} = await run('-h');
    const help = require('../lib/cli/help');
    const expected = help();
    
    t.equal(stdout, expected);
    t.end();
});

test('putout: cli: --help', async (t) => {
    const {stdout} = await run('--help');
    const help = require('../lib/cli/help');
    const expected = help();
    
    t.equal(stdout, expected);
    t.end();
});

test('putout: cli: no files found', async (t) => {
    const {stderr} = await run('abc');
    const expected = 'No files matching the pattern "abc" were found';
    
    t.equal(stripAnsi(stderr), expected);
    t.end();
});

test('putout: cli: ignored', async (t) => {
    const {stdout} = await run(`-f dump ${join(__dirname, './fixture/broken.js')}`);
    const expected = '';
    
    t.equal(stdout, expected);
    t.end();
});

test('putout: cli: --no-config', async (t) => {
    const name = join(__dirname, 'fixture/broken.js');
    const {stdout} = await run(`--no-config ${name}`);
    
    t.ok(stripAnsi(stdout).includes('Const declarations require an initialization value'));
    t.end();
});

