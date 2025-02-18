import {test, stub} from 'supertape';
import isChanged, {
    isEslintChanged,
    isNodeModulesChanged,
} from './is-changed.js';

test('putout: cli: cache files: is changed: isNodeModulesChanged: cannot find', async (t) => {
    const fileCache = {
        canUseCache: stub(),
        setInfo: stub(),
        reconcile: stub(),
    };
    
    const findUp = stub();
    const result = await isNodeModulesChanged(fileCache, {
        findUp,
    });
    
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
    
    const result = await isNodeModulesChanged(fileCache, {
        findUp,
    });
    
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
    const result = await isEslintChanged(fileCache, {
        findUp,
    });
    
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
    
    const result = await isEslintChanged(fileCache, {
        findUp,
    });
    
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
    
    const result = await isChanged(fileCache, {
        findUp,
    });
    
    t.notOk(result);
    t.end();
});
