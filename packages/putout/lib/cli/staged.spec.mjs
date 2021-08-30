import {createMockImport} from 'mock-import';

const {
    mockImport,
    reImport,
    stopAll,
} = createMockImport(import.meta.url);

import fs from 'fs';

import test from 'supertape';
import stub from '@cloudcmd/stub';

import {isSupported} from './supported-files.js';

test('putout: cli: staged', async (t) => {
    const findUp = stub().returns('');
    
    mockImport('find-up', {findUp});
    
    const {get} = await reImport('./staged.mjs');
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
    
    mockImport('find-up', {findUp});
    mockImport('isomorphic-git', {
        statusMatrix,
    });
    
    const {get} = await reImport('./staged.mjs');
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
    
    mockImport('find-up', {findUp});
    mockImport('isomorphic-git', {
        statusMatrix,
    });
    
    const {get} = await reImport('./staged.mjs');
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
    
    mockImport('find-up', {findUp});
    mockImport('isomorphic-git', {
        statusMatrix,
    });
    
    const {get} = await reImport('./staged.mjs');
    
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
    
    mockImport('find-up', {findUp});
    mockImport('isomorphic-git', {
        statusMatrix,
    });
    
    const {set} = await reImport('./staged.mjs');
    
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
    
    mockImport('find-up', {findUp});
    mockImport('isomorphic-git', {
        statusMatrix,
    });
    
    const {set} = await reImport('./staged.mjs');
    
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
    
    mockImport('fs', {});
    mockImport('find-up', {findUp});
    mockImport('isomorphic-git', {
        add,
        status,
        statusMatrix,
    });
    
    const {get, set} = await reImport('./staged.mjs');
    
    await get();
    await set();
    
    stopAll();
    
    const filepath = 'packages/putout/lib/cli/index.js';
    const fs = {};
    
    t.calledWith(add, [{fs, dir, filepath}]);
    t.end();
});

