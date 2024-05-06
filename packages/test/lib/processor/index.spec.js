'use strict';

const {join} = require('node:path');
const {
    stat,
    unlink,
    readFile,
} = require('node:fs/promises');

const tryToCatch = require('try-to-catch');
const {stub} = require('supertape');

const {
    createTest,
    _createProcess,
    _createNoProcess,
    _createComparePlaces,
    _addDot,
} = require('.');

const {createUpdate} = require('../../test/update');

const test = createTest(__dirname, {
    extension: 'json',
    processors: ['json'],
    plugins: ['eslint'],
});

const update = createUpdate();

const CHECK_ASSERTIONS_COUNT = {
    checkAssertionsCount: false,
};

test('putout: test: processor: process', async ({process}) => {
    await process('eslintrc');
});

test('putout: test: processor: no process', async ({noProcess}) => {
    await noProcess('empty-script.html', null, ['html']);
});

test('putout: test: processor: no process: UPDATE', async ({noProcess, calledWith}) => {
    const unlink = stub();
    
    update(1);
    global.unlink = unlink;
    await noProcess('empty-script.html', null, ['html']);
    delete global.unlink;
    update(0);
    
    const name = join(__dirname, 'fixture/empty-script-fix.html');
    calledWith(unlink, [name]);
}, CHECK_ASSERTIONS_COUNT);

test('putout: test: processor: no process: UPDATE: not clean', async ({noProcess, ok}) => {
    update(1);
    await noProcess('empty-script.html', null, ['html']);
    update(0);
    
    const name = join(__dirname, 'fixture/empty-script-fix.html');
    const [error] = await tryToCatch(stat, name);
    
    ok(error, 'should remove file');
}, CHECK_ASSERTIONS_COUNT);

test('putout: test: processor: UPDATE', async ({process, calledWith}) => {
    update(1);
    
    const writeFile = stub();
    
    global.writeFile = writeFile;
    
    await process('eslintrc');
    
    delete global.writeFile;
    update();
    
    const name = join(__dirname, 'fixture/eslintrc-fix.json');
    const data = await readFile(name, 'utf8');
    
    calledWith(writeFile, [name, data]);
}, CHECK_ASSERTIONS_COUNT);

test('putout: test: processor: UPDATE: no fixture', async ({process, ok}) => {
    update(1);
    
    await process('no-fixture');
    
    update();
    
    const nameOutput = join(__dirname, 'fixture/no-fixture-fix.json');
    
    const result = stat(nameOutput);
    
    await unlink(nameOutput);
    
    ok(result, 'should create output file');
}, CHECK_ASSERTIONS_COUNT);

test('putout: test: processor: UPDATE: no global', async ({process}) => {
    update(1);
    await process('eslintrc');
    
    update();
}, CHECK_ASSERTIONS_COUNT);

test('putout: test: processor: UPDATE: not a number', async ({process, notCalled}) => {
    update('hello');
    
    const writeFile = stub();
    
    global.writeFile = writeFile;
    
    await process('eslintrc');
    
    delete global.writeFile;
    update();
    
    notCalled(writeFile);
}, CHECK_ASSERTIONS_COUNT);

test('putout: test: processor: process: no filename', (t) => {
    const fail = stub();
    const createRunner = _createProcess();
    
    const operator = {
        fail,
    };
    
    const runner = createRunner(operator);
    
    runner();
    
    t.calledWith(fail, [`Expected filename to be string!`]);
    t.end();
});

test('putout: test: processor: no process: no filename', (t) => {
    const fail = stub();
    const createRunner = _createNoProcess();
    
    const operator = {
        fail,
    };
    
    const runner = createRunner(operator);
    
    runner();
    
    t.calledWith(fail, [`Expected filename to be string!`]);
    t.end();
});

test('putout: test: processor: comparePlaces', async ({comparePlaces}) => {
    await comparePlaces('style.css', []);
});

test('putout: test: processor: comparePlaces: no filename', (t) => {
    const fail = stub();
    const createRunner = _createComparePlaces();
    
    const operator = {
        fail,
    };
    
    const runner = createRunner(operator);
    
    runner();
    
    t.calledWith(fail, [`Expected filename to be string!`]);
    t.end();
});

test('putout: test: processor: addDot', (t) => {
    t.equal(_addDot(''), '');
    t.end();
});
