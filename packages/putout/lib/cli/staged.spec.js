'use strict';

const fs = require('fs');

const test = require('supertape');
const stub = require('@cloudcmd/stub');
const mockRequire = require('mock-require');

const {isSupported} = require('./supported-files');

const {reRequire, stopAll} = mockRequire;

test('putout: cli: staged', async (t) => {
    const findUp = stub().returns('');
    
    mockRequire('find-up', findUp);
    
    const {get} = reRequire('./staged');
    await get();
    
    stopAll();
    
    const type = 'directory';
    t.calledWith(findUp, ['.git', {type}], 'should call find-up');
    t.end();
});

test('putout: cli: staged: get: statusMatrix: empty', async (t) => {
    const dir = '/putout';
    const findUp = stub().returns(dir);
    const statusMatrix = stub().returns([
    ]);
    
    mockRequire('find-up', findUp);
    mockRequire('isomorphic-git', {
        statusMatrix,
    });
    
    const {get} = reRequire('./staged');
    await get();
    
    stopAll();
    
    const expected = {
        fs,
        dir,
        filter: isSupported,
    };
    t.calledWith(statusMatrix, [expected]);
    t.end();
});

test('putout: cli: staged: get: statusMatrix', async (t) => {
    const dir = '/putout';
    const findUp = stub().returns(dir);
    const statusMatrix = stub().returns([
        [ 'packages/putout/lib/cli/index.js', 1, 2, 2 ],
        [ 'packages/putout/lib/cli/staged.js', 1, 2, 3 ],
    ]);
    
    mockRequire('find-up', findUp);
    mockRequire('isomorphic-git', {
        statusMatrix,
    });
    
    const {get} = reRequire('./staged');
    await get();
    
    stopAll();
    
    const expected = {
        fs,
        dir,
        filter: isSupported,
    };
    
    t.calledWith(statusMatrix, [expected]);
    t.end();
});

test('putout: cli: staged: get: statusMatrix: result', async (t) => {
    const dir = '/putout';
    const findUp = stub().returns(dir);
    const statusMatrix = stub().returns([
        [ 'packages/putout/lib/cli/index.js', 1, 2, 2 ],
    ]);
    
    mockRequire('find-up', findUp);
    mockRequire('isomorphic-git', {
        statusMatrix,
    });
    
    const {get} = reRequire('./staged');
    
    const names = await get();
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
    const statusMatrix = stub().returns([
        [ 'packages/putout/lib/cli/index.js', 1, 2, 2 ],
    ]);
    
    mockRequire('find-up', findUp);
    mockRequire('isomorphic-git', {
        statusMatrix,
    });
    
    const {set} = reRequire('./staged');
    
    await set();
    
    stopAll();
    
    const type = 'directory';
    
    t.calledWith(findUp, ['.git', {type}]);
    t.end();
});

test('putout: cli: staged: set: findUp: not found', async (t) => {
    const dir = '';
    const findUp = stub().returns(dir);
    const statusMatrix = stub().returns([
        [ 'packages/putout/lib/cli/index.js', 1, 2, 2 ],
    ]);
    
    mockRequire('find-up', findUp);
    mockRequire('isomorphic-git', {
        statusMatrix,
    });
    
    const {set} = reRequire('./staged');
    
    await set();
    
    stopAll();
    
    const type = 'directory';
    
    t.calledWith(findUp, ['.git', {type}]);
    t.end();
});

test('putout: cli: staged: add', async (t) => {
    const dir = '/putout';
    const findUp = stub().returns(dir);
    const statusMatrix = stub().returns([
        [ 'packages/putout/lib/cli/index.js', 1, 2, 2 ],
    ]);
    
    const add = stub();
    const status = stub().returns('modified');
    
    mockRequire('fs', {});
    mockRequire('find-up', findUp);
    mockRequire('isomorphic-git', {
        add,
        status,
        statusMatrix,
    });
    
    const {get, set} = reRequire('./staged');
    
    await get();
    await set();
    
    stopAll();
    
    const filepath = 'packages/putout/lib/cli/index.js';
    const fs = {};
    
    t.calledWith(add, [{fs, dir, filepath}]);
    t.end();
});

