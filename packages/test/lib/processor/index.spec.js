'use strict';

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

test('putout: test: processor: process', async ({process}) => {
    await process('eslintrc');
});

test('putout: test: processor: no process', async (t) => {
    await t.noProcess('empty-script.html', null, [
        'html',
    ]);
});

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

