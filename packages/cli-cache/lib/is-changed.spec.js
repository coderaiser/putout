'use strict';

const {test, stub} = require('supertape');
const mockRequire = require('mock-require');
const {stopAll, reRequire} = mockRequire;

test('putout: cli: cache files: is changed: isNodeModulesChanged: cannot find', async (t) => {
    const fileCache = {
        canUseCache: stub(),
        setInfo: stub(),
        reconcile: stub(),
    };
    
    const simpleImport = stub().resolves({
        findNodeModules: stub(),
    });
    
    mockRequire('./simple-import', {
        simpleImport,
    });
    
    const {isNodeModulesChanged} = reRequire('./is-changed');
    
    const result = await isNodeModulesChanged(fileCache);
    
    stopAll();
    
    t.notOk(result);
    t.end();
});

test('putout: cli: cache files: is changed: isNodeModulesChanged', async (t) => {
    const fileCache = {
        canUseCache: stub(),
        setInfo: stub(),
        reconcile: stub(),
    };
    
    const findUp = stub().returns('xx');
    
    const {isNodeModulesChanged} = reRequire('./is-changed');
    
    const result = await isNodeModulesChanged(fileCache, {
        findUp,
    });
    
    stopAll();
    
    t.ok(result);
    t.end();
});

test('putout: cli: cache files: is changed: isEslintChanged: cannot find', async (t) => {
    const fileCache = {
        canUseCache: stub(),
        setInfo: stub(),
        reconcile: stub(),
    };
    
    const findUp = stub();
    
    const {isEslintChanged} = reRequire('./is-changed');
    
    const result = await isEslintChanged(fileCache, {
        findUp,
    });
    
    stopAll();
    
    t.notOk(result);
    t.end();
});

test('putout: cli: cache files: is changed: isEslintChanged', async (t) => {
    const fileCache = {
        canUseCache: stub(),
        setInfo: stub(),
        reconcile: stub(),
    };
    
    const findUp = stub().returns('xxx');
    
    const {isEslintChanged} = reRequire('./is-changed');
    
    const result = await isEslintChanged(fileCache, {
        findUp,
    });
    
    stopAll();
    
    t.ok(result);
    t.end();
});

test('putout: cli: cache files: is changed', async (t) => {
    const fileCache = {
        canUseCache: stub(),
        setInfo: stub(),
        reconcile: stub(),
    };
    
    const findUp = stub();
    const simpleImport = stub().resolves({
        findNodeModules: stub(),
    });
    
    mockRequire('./simple-import', {
        simpleImport,
    });
    
    const isChanged = reRequire('./is-changed');
    
    const result = await isChanged(fileCache, {
        findUp,
    });
    
    stopAll();
    
    t.notOk(result);
    t.end();
});
