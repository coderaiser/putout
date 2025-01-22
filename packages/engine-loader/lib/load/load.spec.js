'use strict';

const {join} = require('node:path');
const process = require('node:process');
const tryCatch = require('try-catch');
const mockRequire = require('mock-require');
const {test, stub} = require('supertape');

const {stopAll, reRequire} = mockRequire;
const {assign} = Object;

test('putout: engine-loader: load: yarn OnP support', (t) => {
    const customRequire = stub().returns('plugin');
    
    assign(customRequire, {
        resolve: stub().returns('world'),
    });
    
    const createRequire = stub().returns(customRequire);
    
    mockRequire('node:module', {
        createRequire,
    });
    
    const {loadPlugin} = reRequire('./load.js');
    
    const result = loadPlugin({
        name: 'hello',
        namespace: 'putout',
    });
    
    const expected = 'plugin';
    
    stopAll();
    
    t.equal(result, expected);
    t.end();
});

test('putout: engine-loader: load: env: PUTOUT_YARN_PNP', (t) => {
    process.env.PUTOUT_YARN_PNP = 'hello';
    
    const {loadPlugin} = reRequire('./load.js');
    const [error] = tryCatch(loadPlugin, {
        name: 'hello',
        namespace: 'putout',
    });
    
    delete process.env.PUTOUT_YARN_PNP;
    
    t.match(error.message, `Cannot find module 'hello'`);
    t.end();
});

test('putout: engine-loader: load: createRequire', (t) => {
    const customRequire = stub().returns('plugin');
    
    assign(customRequire, {
        resolve: stub().returns('world'),
    });
    
    const createRequire = stub().returns(customRequire);
    
    mockRequire('node:module', {
        createRequire,
    });
    
    const {loadPlugin} = reRequire('./load.js');
    
    tryCatch(loadPlugin, {
        name: '@putout/plugin-remove-debugger',
        namespace: 'putout',
    });
    
    stopAll();
    
    reRequire('./load.js');
    
    t.calledCount(createRequire, 2, 'should call for "putout" and PUTOUT_YARN_PNP');
    t.end();
});

test('putout: engine-loader: load: PUTOUT_LOAD_DIR', (t) => {
    process.env.PUTOUT_LOAD_DIR = join(__dirname, 'fixture');
    
    const {loadPlugin} = reRequire('./load.js');
    const {report} = loadPlugin({
        namespace: 'putout',
        name: 'hello',
    });
    
    delete process.env.PUTOUT_LOAD_DIR;
    
    const result = report();
    const expected = 'hello';
    
    t.equal(result, expected);
    t.end();
});
