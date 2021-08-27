import {
    test,
    stub,
} from 'supertape';
import {createMockImport} from 'mock-import';

const {
    mockImport,
    reImport,
    stopAll,
} = createMockImport(import.meta.url);

test('putout: cli: cache files: is changed: isNodeModulesChanged: cannot find', async (t) => {
    const fileCache = {
        canUseCache: stub(),
        setInfo: stub(),
        reconcile: stub(),
    };
    
    const findUp = stub();
    mockImport('find-up', {findUp});
    
    const {isNodeModulesChanged} = await reImport('./is-changed.mjs');
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
    mockImport('find-up', {findUp});
    
    const {isNodeModulesChanged} = await reImport('./is-changed.mjs');
    const result = await isNodeModulesChanged(fileCache);
    
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
    mockImport('find-up', {findUp});
    
    const {isEslintChanged} = await reImport('./is-changed.mjs');
    const result = await isEslintChanged(fileCache);
    
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
    mockImport('find-up', {findUp});
    
    const {isEslintChanged} = await reImport('./is-changed.mjs');
    const result = await isEslintChanged(fileCache);
    
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
    mockImport('find-up', {findUp});
    
    const {isChanged} = await reImport('./is-changed.mjs');
    const result = await isChanged(fileCache);
    
    stopAll();
    
    t.notOk(result);
    t.end();
});

