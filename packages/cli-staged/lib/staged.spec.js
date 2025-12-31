import {tryToCatch} from 'try-to-catch';
import {test, stub} from 'supertape';
import {get, set} from './staged.js';

test('putout: cli: staged', async (t) => {
    const findUp = stub().returns('.');
    
    await get({
        findUp,
        isSupported: Boolean,
    });
    
    const type = 'directory';
    
    const args = ['.git', {
        type,
    }];
    
    t.calledWith(findUp, args);
    t.end();
});

test('putout: cli: staged: set: porcelain', async (t) => {
    const dir = '/putout';
    const findUp = stub().returns(dir);
    
    const porcelain = stub().returns(['packages/putout/lib/cli/index.js']);
    
    await set({
        findUp,
        porcelain,
    });
    
    const expected = [{
        unstaged: true,
    }];
    
    t.calledWith(porcelain, expected);
    t.end();
});

test('putout: cli: staged: get: statusMatrix', async (t) => {
    const dir = '/putout';
    const findUp = stub().returns(dir);
    
    const porcelain = stub().returns(['packages/putout/lib/cli/index.js']);
    
    await get({
        findUp,
        isSupported: Boolean,
        porcelain,
    });
    
    const expected = {
        added: true,
        modified: true,
        renamed: true,
    };
    
    t.calledWith(porcelain, [expected]);
    t.end();
});

test('putout: cli: staged: get: statusMatrix: result', async (t) => {
    const dir = '/putout';
    const findUp = stub().returns(dir);
    
    const porcelain = stub().returns(['packages/putout/lib/cli/index.js']);
    
    const names = await get({
        findUp,
        isSupported: Boolean,
        porcelain,
    });
    
    const expected = [
        '/putout/packages/putout/lib/cli/index.js',
    ];
    
    t.deepEqual(names, expected);
    t.end();
});

test('putout: cli: staged: set: findUp', async (t) => {
    const dir = '/putout';
    const findUp = stub().returns(dir);
    
    const porcelain = stub().returns(['packages/putout/lib/cli/index.js']);
    
    await set({
        findUp,
        porcelain,
    });
    
    const type = 'directory';
    
    t.calledWith(findUp, ['.git', {
        type,
    }]);
    t.end();
});

test('putout: cli: staged: set: findUp: not found', async (t) => {
    const dir = '';
    const findUp = stub().returns(dir);
    
    await tryToCatch(set, {
        findUp,
    });
    
    const type = 'directory';
    
    t.calledWith(findUp, ['.git', {
        type,
    }]);
    t.end();
});

test('putout: cli: staged: add', async (t) => {
    const dir = '/putout';
    const findUp = stub().returns(dir);
    
    let called = false;
    
    const porcelain = () => {
        if (called)
            return [];
        
        called = true;
        
        return [
            'packages/putout/lib/cli/index.js',
        ];
    };
    
    const spawnSync = stub();
    
    await get({
        findUp,
        isSupported: Boolean,
        porcelain,
    });
    
    await set({
        findUp,
        spawnSync,
        porcelain,
    });
    
    const filepath = 'packages/putout/lib/cli/index.js';
    
    const args = ['git', [
        'add',
        `${dir}/${filepath}`,
    ]];
    
    t.calledWith(spawnSync, args);
    t.end();
});

test('putout: cli: staged: no files', async (t) => {
    const dir = '/putout';
    const findUp = stub().returns(dir);
    
    let called = false;
    
    const porcelain = () => {
        if (called)
            return [];
        
        called = true;
        
        return [
            'packages/putout/lib/cli/index.js',
        ];
    };
    
    const spawnSync = stub();
    const isSupported = stub().returns(false);
    
    await get({
        findUp,
        isSupported,
        porcelain,
    });
    
    await set({
        findUp,
        spawnSync,
        porcelain,
    });
    
    t.notCalled(spawnSync);
    t.end();
});
