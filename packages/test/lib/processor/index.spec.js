'use strict';

const {join} = require('path');
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

test('putout: test: processor: UPDATE', async ({process, calledWith}) => {
    update(1);
    
    const {readFile} = require('fs/promises');
    const writeFile = stub();
    
    global.writeFile = writeFile;
    
    await process('eslintrc');
    
    delete global.writeFile;
    update();
    
    const name = join(__dirname, 'fixture/eslintrc-fix.json');
    const data = await readFile(name, 'utf8');
    
    calledWith(writeFile, [name, data]);
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
