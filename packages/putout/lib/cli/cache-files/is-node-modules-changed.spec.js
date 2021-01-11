'use strict';

const {test, stub} = require('supertape');
const mockRequire = require('mock-require');

const isNodeModulesChanged = require('./is-node-modules-changed');

const {stopAll, reRequire} = mockRequire;

test('putout: cli: cache files: isNodeModulesChanged: cannot find', async (t) => {
    const fileCache = {
        canUseCache: stub(),
        setInfo: stub(),
        reconcile: stub(),
    };
    
    mockRequire('find-up', stub());
    
    const isNodeModulesChanged = reRequire('./is-node-modules-changed');
    const result = await isNodeModulesChanged(fileCache);
    
    stopAll();
    
    t.notOk(result);
    t.end();
});

test('putout: cli: cache files: isNodeModulesChanged', async (t) => {
    const fileCache = {
        canUseCache: stub(),
        setInfo: stub(),
        reconcile: stub(),
    };
    
    mockRequire('find-up', stub());
    
    const result = await isNodeModulesChanged(fileCache);
    
    stopAll();
    
    t.ok(result);
    t.end();
});
