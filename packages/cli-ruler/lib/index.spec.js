import {
    test,
    stub,
} from 'supertape';

import {rulerProcessor} from './index.js';

const {stringify} = JSON;
const reject = Promise.reject.bind(Promise);

test('putout: cli: ruler-processor: read', async (t) => {
    const enable = 'remove-unused-variables';
    const places = [];
    
    const readFile = stub().returns('{}');
    const writeFile = stub();
    
    await rulerProcessor({enable, readFile, writeFile}, places);
    
    const name = `${process.cwd()}/.putout.json`;
    
    t.calledWith(readFile, [name, 'utf8'], 'should read config');
    t.end();
});

test('putout: cli: ruler-processor: read: error', async (t) => {
    const enable = 'remove-unused-variables';
    const places = [];
    
    const readFile = stub().returns(reject('no file'));
    const writeFile = stub();
    
    await rulerProcessor({enable, readFile, writeFile}, places);
    
    const name = `${process.cwd()}/.putout.json`;
    const expected = stringify({
        rules: {
            'remove-unused-variables': 'on',
        },
    }, null, 4);
    
    t.calledWith(writeFile, [name, expected], 'should write config');
    t.end();
});

test('putout: cli: ruler-processor: write', async (t) => {
    const readFile = stub().returns('{}');
    const writeFile = stub();
    
    const enable = 'remove-unused-variables';
    const places = [];
    
    await rulerProcessor({enable, readFile, writeFile}, places);
    
    const name = `${process.cwd()}/.putout.json`;
    const expected = stringify({
        rules: {
            'remove-unused-variables': 'on',
        },
    }, null, 4);
    
    t.calledWith(writeFile, [name, expected], 'should write config');
    t.end();
});

test('putout: cli: ruler-processor: disable', async (t) => {
    const readFile = stub().returns('{}');
    const writeFile = stub();
    
    const disable = 'remove-unused-variables';
    const places = [];
    
    await rulerProcessor({disable, readFile, writeFile}, places);
    
    const name = `${process.cwd()}/.putout.json`;
    const expected = stringify({
        rules: {
            'remove-unused-variables': 'off',
        },
    }, null, 4);
    
    t.calledWith(writeFile, [name, expected], 'should write config');
    t.end();
});

test('putout: cli: ruler-processor: enable all', async (t) => {
    const writeFile = stub();
    const readFile = stub().returns(stringify({
        rules: {
            'remove-debugger': 'off',
            'remove-unused-variables': 'off',
        },
    }));
    
    const enableAll = true;
    const places = [{
        rule: 'remove-unused-variables',
    }, {
        rule: 'remove-debugger',
    }];
    
    await rulerProcessor({enableAll, readFile, writeFile}, places);
    
    const name = `${process.cwd()}/.putout.json`;
    const expected = stringify({
        rules: {
            'remove-debugger': 'on',
            'remove-unused-variables': 'on',
        },
    }, null, 4);
    
    t.calledWith(writeFile, [name, expected], 'should enable all');
    t.end();
});

test('putout: cli: ruler-processor: disable all', async (t) => {
    const readFile = stub().returns(stringify({
        rules: {
            'remove-debugger': 'on',
            'remove-unused-variables': 'off',
        },
    }));
    const writeFile = stub();
    
    const disableAll = true;
    const places = [{
        rule: 'remove-unused-variables',
    }, {
        rule: 'remove-debugger',
    }];
    
    await rulerProcessor({disableAll, readFile, writeFile}, places);
    
    const name = `${process.cwd()}/.putout.json`;
    const expected = stringify({
        rules: {
            'remove-debugger': 'off',
            'remove-unused-variables': 'off',
        },
    }, null, 4);
    
    t.calledWith(writeFile, [name, expected], 'should enable all');
    t.end();
});

test('putout: cli: ruler-processor: no option', async (t) => {
    const readFile = stub().returns(stringify({
        rules: {
            'remove-debugger': 'on',
            'remove-unused-variables': 'off',
        },
    }));
    const writeFile = stub();
    const places = [];
    
    const options = {
        readFile,
        writeFile,
    };
    await rulerProcessor(options, places);
    
    const name = `${process.cwd()}/.putout.json`;
    const expected = stringify({
        rules: {
            'remove-debugger': 'on',
            'remove-unused-variables': 'off',
        },
    }, null, 4);
    
    t.calledWith(writeFile, [name, expected], 'should enable all');
    t.end();
});

