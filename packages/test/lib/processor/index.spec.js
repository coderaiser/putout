'use strict';

const {stub} = require('supertape');

const {
    createTest,
    _createProcess,
    _createComparePlaces,
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

test('putout: test: processor: process', async (t) => {
    await t.process('eslintrc');
});

test('putout: test: processor: no filename', (t) => {
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

test('putout: test: processor: comparePlaces', async (t) => {
    await t.comparePlaces('style.css', []);
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

