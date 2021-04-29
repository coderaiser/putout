'use strict';

const {stub} = require('supertape');

const {createTest, _createProcess} = require('./processor');
const test = createTest(__dirname, {
    extension: 'json',
    processors: [
        'json',
    ],
    plugins: [
        'eslint',
    ],
});

test('putout: test: processor', async (t) => {
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

