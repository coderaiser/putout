'use strict';

const fs = require('fs/promises');

const test = require('supertape');
const mockRequire = require('mock-require');
const {stopAll, reRequire} = mockRequire;
const stub = require('@cloudcmd/stub');

const {stringify} = JSON;
const reject = Promise.reject.bind(Promise);

test('putout: cli: ruler-processor: read', async (t) => {
    const enable = 'remove-unused-variables';
    const places = [];
    
    const readFileStub = stub().returns('{}');
    const writeFileStub = stub();
    
    mockRequire('fs/promises', {
        readFile: readFileStub,
        writeFile: writeFileStub,
    });
    
    const rulerProcessor = reRequire('./ruler-processor');
    await rulerProcessor({enable}, places);
    
    const name = `${process.cwd()}/.putout.json`;
    
    stopAll();
    
    t.calledWith(readFileStub, [name, 'utf8'], 'should read config');
    t.end();
});

test('putout: cli: ruler-processor: read: error', async (t) => {
    const enable = 'remove-unused-variables';
    const places = [];
    
    const readFileStub = stub().returns(reject('no file'));
    const writeFileStub = stub();
    
    mockRequire('fs/promises', {
        readFile: readFileStub,
        writeFile: writeFileStub,
    });
    
    const rulerProcessor = reRequire('./ruler-processor');
    await rulerProcessor({enable}, places);
    
    stopAll();
    
    const name = `${process.cwd()}/.putout.json`;
    const expected = stringify({
        rules: {
            'remove-unused-variables': 'on',
        },
    }, null, 4);
    
    t.calledWith(writeFileStub, [name, expected], 'should write config');
    t.end();
});

test('putout: cli: ruler-processor: write', async (t) => {
    const readFileStub = stub().returns('{}');
    const writeFileStub = stub();
    
    mockRequire('fs/promises', {
        readFile: readFileStub,
        writeFile: writeFileStub,
    });
    
    const rulerProcessor = reRequire('./ruler-processor');
    
    const enable = 'remove-unused-variables';
    const places = [];
    
    await rulerProcessor({enable}, places);
    stopAll();
    
    const name = `${process.cwd()}/.putout.json`;
    const expected = stringify({
        rules: {
            'remove-unused-variables': 'on',
        },
    }, null, 4);
    
    t.calledWith(writeFileStub, [name, expected], 'should write config');
    t.end();
});

test('putout: cli: ruler-processor: disable', async (t) => {
    const readFileStub = stub().returns('{}');
    const writeFileStub = stub();
    
    mockRequire('fs/promises', {
        readFile: readFileStub,
        writeFile: writeFileStub,
    });
    
    const rulerProcessor = reRequire('./ruler-processor');
    
    const disable = 'remove-unused-variables';
    const places = [];
    
    await rulerProcessor({disable}, places);
    stopAll();
    
    const name = `${process.cwd()}/.putout.json`;
    const expected = stringify({
        rules: {
            'remove-unused-variables': 'off',
        },
    }, null, 4);
    
    t.calledWith(writeFileStub, [name, expected], 'should write config');
    t.end();
});

test('putout: cli: ruler-processor: enable all', async (t) => {
    const readFileStub = stub().returns(stringify({
        rules: {
            'remove-debugger': 'off',
            'remove-unused-variables': 'off',
        },
    }));
    const writeFileStub = stub();
    
    mockRequire('fs/promises', {
        readFile: readFileStub,
        writeFile: writeFileStub,
    });
    
    const enableAll = true;
    const places = [{
        rule: 'remove-unused-variables',
    }, {
        rule: 'remove-debugger',
    }];
    
    const rulerProcessor = reRequire('./ruler-processor');
    await rulerProcessor({enableAll}, places);
    stopAll();
    
    const name = `${process.cwd()}/.putout.json`;
    const expected = stringify({
        rules: {
            'remove-debugger': 'on',
            'remove-unused-variables': 'on',
        },
    }, null, 4);
    
    t.calledWith(writeFileStub, [name, expected], 'should enable all');
    t.end();
});

test('putout: cli: ruler-processor: disable all', async (t) => {
    const {readFile, writeFile} = fs;
    
    const readFileStub = stub().returns(stringify({
        rules: {
            'remove-debugger': 'on',
            'remove-unused-variables': 'off',
        },
    }));
    const writeFileStub = stub();
    
    mockRequire('fs/promises', {
        readFile: readFileStub,
        writeFile: writeFileStub,
    });
    
    const disableAll = true;
    const places = [{
        rule: 'remove-unused-variables',
    }, {
        rule: 'remove-debugger',
    }];
    
    const rulerProcessor = reRequire('./ruler-processor');
    await rulerProcessor({disableAll}, places);
    stopAll();
    
    fs.readFile = readFile;
    fs.writeFile = writeFile;
    
    const name = `${process.cwd()}/.putout.json`;
    const expected = stringify({
        rules: {
            'remove-debugger': 'off',
            'remove-unused-variables': 'off',
        },
    }, null, 4);
    
    t.calledWith(writeFileStub, [name, expected], 'should enable all');
    t.end();
});

test('putout: cli: ruler-processor: no option', async (t) => {
    const readFileStub = stub().returns(stringify({
        rules: {
            'remove-debugger': 'on',
            'remove-unused-variables': 'off',
        },
    }));
    const writeFileStub = stub();
    
    mockRequire('fs/promises', {
        readFile: readFileStub,
        writeFile: writeFileStub,
    });
    
    const places = [];
    const rulerProcessor = reRequire('./ruler-processor');
    
    const options = {};
    await rulerProcessor(options, places);
    stopAll();
    
    const name = `${process.cwd()}/.putout.json`;
    const expected = stringify({
        rules: {
            'remove-debugger': 'on',
            'remove-unused-variables': 'off',
        },
    }, null, 4);
    
    t.calledWith(writeFileStub, [name, expected], 'should enable all');
    t.end();
});

