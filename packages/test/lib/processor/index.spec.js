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

const test = createTest(__dirname, {
    extension: 'json',
    processors: [
        'json',
    ],
    plugins: [
        'eslint',
    ],
});

const getBackEnv = (update) => {
    const {env} = global.process;
    
    if (update) {
        env.UPDATE = update;
        return;
    }
    
    delete env.UPDATE;
};

test('putout: test: processor: process', async ({process}) => {
    await process('eslintrc');
});

test('putout: test: processor: no process', async ({noProcess}) => {
    await noProcess('empty-script.html', null, [
        'html',
    ]);
});

test('putout: test: processor: UPDATE', async ({process, calledWith}) => {
    const {env} = global.process;
    const {UPDATE} = env;
    
    env.UPDATE = 1;
    
    const {readFile} = require('fs/promises');
    const writeFile = stub();
    
    global.writeFile = writeFile;
    
    await process('eslintrc');
    
    getBackEnv(UPDATE);
    delete global.writeFile;
    
    const name = join(__dirname, 'fixture/eslintrc-fix.json');
    const data = await readFile(name, 'utf8');
    
    calledWith(writeFile, [name, data]);
}, {checkAssertionsCount: false});

test('putout: test: processor: UPDATE: no global', async ({process}) => {
    const {env} = global.process;
    const {UPDATE} = env;
    
    env.UPDATE = 1;
    
    await process('eslintrc');
    
    getBackEnv(UPDATE);
}, {checkAssertionsCount: false});

test('putout: test: processor: UPDATE: not a number', async ({process, notCalled}) => {
    const {env} = global.process;
    const {UPDATE} = env;
    
    env.UPDATE = 'hello';
    
    const writeFile = stub();
    
    global.writeFile = writeFile;
    
    await process('eslintrc');
    
    getBackEnv(UPDATE);
    delete global.writeFile;
    
    notCalled(writeFile);
}, {checkAssertionsCount: false});

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

