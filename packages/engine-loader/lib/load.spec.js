'use strict';

const tryCatch = require('try-catch');

const mockRequire = require('mock-require');

const {test, stub} = require('supertape');

const {
    stopAll,
    reRequire,
} = mockRequire;

const {assign} = Object;

test('putout: engine-loader: laod: yarn PnP support', (t) => {
    const customRequire = stub().returns('plugin');
    
    assign(customRequire, {
        resolve: stub().returns('world'),
    });
    
    const createRequire = stub().returns(customRequire);
    
    mockRequire('module', {
        createRequire,
    });
    
    const {loadPlugin} = reRequire('./load.js');
    const result = loadPlugin({
        name: 'hello',
        namespace: 'putout',
    });
    
    const expected = 'plugin';
    
    stopAll();
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: engine-loader: laod: env: PUTOUT_YARN_PNP', (t) => {
    const customRequire = stub().returns('plugin');
    
    assign(customRequire, {
        resolve: stub().returns('world'),
    });
    
    const createRequire = stub().returns(customRequire);
    
    mockRequire('module', {
        createRequire,
    });
    
    process.env.PUTOUT_YARN_PNP = 'hello';
    
    const {loadPlugin} = reRequire('./load.js');
    const [error] = tryCatch(loadPlugin, {
        name: 'hello',
        namespace: 'putout',
    });
    
    stopAll();
    
    t.match(error.message, `Cannot find module 'hello'`);
    t.end();
});

