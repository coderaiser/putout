'use strict';

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

