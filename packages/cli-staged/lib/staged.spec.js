'use strict';

const tryToCatch = require('try-to-catch');
const {test, stub} = require('supertape');
const mockRequire = require('mock-require');

const {
    reRequire,
    stopAll,
} = mockRequire;

test('putout: cli: staged', async (t) => {
    const findUp = stub().returns('.');
    
    const {get} = reRequire('./staged');
    
    await get({
        findUp,
        isSupported: Boolean,
    });
    
    stopAll();
    
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
    
    mockRequire('@putout/git-status-porcelain', porcelain);
    
    const {set} = reRequire('./staged');
    
    await set({
        findUp,
    });
    
    stopAll();
    
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
    
    mockRequire('@putout/git-status-porcelain', porcelain);
    
    const {get} = reRequire('./staged');
    
    await get({
        findUp,
        isSupported: Boolean,
    });
    
    stopAll();
    
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
    
    mockRequire('@putout/git-status-porcelain', porcelain);
    const {get} = reRequire('./staged');
    
    const names = await get({
        findUp,
        isSupported: Boolean,
    });
    
    stopAll();
    
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
    
    mockRequire('@putout/git-status-porcelain', porcelain);
    
    const {set} = reRequire('./staged');
    
    await set({
        findUp,
    });
    
    stopAll();
    
    const type = 'directory';
    
    t.calledWith(findUp, ['.git', {
        type,
    }]);
    t.end();
});

test('putout: cli: staged: set: findUp: not found', async (t) => {
    const dir = '';
    const findUp = stub().returns(dir);
    
    const statusMatrix = stub().returns([
        [
            'packages/putout/lib/cli/index.js',
            1,
            2,
            2,
        ],
    ]);
    
    mockRequire('isomorphic-git', {
        statusMatrix,
    });
    
    const {set} = reRequire('./staged');
    
    await tryToCatch(set, {
        findUp,
    });
    
    stopAll();
    
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
    
    mockRequire('child_process', {
        spawnSync,
    });
    mockRequire('@putout/git-status-porcelain', porcelain);
    
    const {get, set} = reRequire('./staged');
    
    await get({
        findUp,
        isSupported: Boolean,
    });
    
    await set({
        findUp,
    });
    
    stopAll();
    
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
    
    mockRequire('child_process', {
        spawnSync,
    });
    mockRequire('@putout/git-status-porcelain', porcelain);
    
    const {get, set} = reRequire('./staged');
    
    await get({
        findUp,
        isSupported,
    });
    
    await set({
        findUp,
    });
    
    stopAll();
    
    t.notCalled(spawnSync);
    t.end();
});
