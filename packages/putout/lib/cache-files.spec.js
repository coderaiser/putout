'use strict';

const test = require('supertape');
const mockRequire = require('mock-require');
const stub = require('@cloudcmd/stub');

const cacheFiles = require('./cache-files');

const {reRequire} = mockRequire;

test('putout: cache-files: disabled: fileCache', (t) => {
    const fileCache = cacheFiles({
        cache: false,
    });
    
    t.equal(fileCache, cacheFiles._defaultFileCache);
    t.end();
});

test('putout: cache-files: enabled: setInfo', (t) => {
    const meta = {
        optionsHash: 'hello',
        places: ['world'],
    };
    
    const getFileDescriptor = stub().returns({
        meta,
    });
    
    const createFromFile = stub().returns({
        getFileDescriptor,
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    mockRequire('file-entry-cache', fileEntryCache);
    const cacheFiles = reRequire('./cache-files');
    
    const fileCache = cacheFiles({
        cache: true,
        files: [],
    });
    
    const name = 'hello';
    fileCache.setInfo(name, ['world'], {hello: 'world'});
    
    t.ok(getFileDescriptor.calledWith(name), 'should call getFileDescriptor');
    t.end();
});

