'use strict';

const test = require('supertape');
const stub = require('@cloudcmd/stub');
const mockRequire = require('mock-require');

const {reRequire, stopAll} = mockRequire;

test('putout: cli: get-git-names', (t) => {
    const options = {};
    const sync = stub().returns('');
    
    mockRequire('find-up', {
        sync,
    });
    
    const getGitNames = reRequire('./get-git-names');
    const result = getGitNames(options);
    
    stopAll();
    
    t.deepEqual(result, []);
    t.end();
});

test('putout: cli: get-git-names: porcelain', (t) => {
    const options = {};
    const sync = stub().returns('/cloudcmd/.git');
    const porcelain = stub().returns([
        '1.js',
        '1.ts',
        'README.md',
    ]);
    
    mockRequire('find-up', {
        sync,
    });
    
    mockRequire('@putout/git-status-porcelain', porcelain);
    
    const getGitNames = reRequire('./get-git-names');
    const result = getGitNames(options);
    
    stopAll();
    
    const expected = [
        '/cloudcmd/1.js',
        '/cloudcmd/1.ts',
    ];
    
    t.deepEqual(result, expected, 'should keep only js files');
    t.end();
});

