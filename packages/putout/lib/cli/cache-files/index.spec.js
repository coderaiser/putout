'use strict';

const fs = require('fs');

const test = require('supertape');
const mockRequire = require('mock-require');
const stub = require('@cloudcmd/stub');

const cacheFiles = require('.');
const {_CACHE_FILE} = cacheFiles;

const {reRequire} = mockRequire;

test('putout: cache-files: disabled: fileCache', async (t) => {
    const fileCache = await cacheFiles({
        cache: false,
    });
    
    t.equal(fileCache, cacheFiles._defaultFileCache);
    t.end();
});

test('putout: cache-files: fileCache: fresh', async (t) => {
    const {unlinkSync} = fs;
    
    const _unlinkSync = stub();
    fs.unlinkSync = _unlinkSync;
    
    mockRequire('find-up', stub().returns(_CACHE_FILE));
    const cacheFiles = reRequire('.');
    
    await cacheFiles({
        fresh: true,
    });
    
    fs.unlinkSync = unlinkSync;
    
    t.ok(_unlinkSync.calledWith(_CACHE_FILE));
    t.end();
});

test(`putout: cache-files: find up can't find`, async (t) => {
    const {unlinkSync} = fs;
    
    const _unlinkSync = stub();
    fs.unlinkSync = _unlinkSync;
    
    mockRequire('find-up', stub());
    const cacheFiles = reRequire('.');
    
    await cacheFiles({
        fresh: true,
    });
    
    fs.unlinkSync = unlinkSync;
    
    t.ok(_unlinkSync.calledWith(_CACHE_FILE));
    t.end();
});

test('putout: cache-files: enabled: setInfo', async (t) => {
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
    const cacheFiles = reRequire('.');
    
    const fileCache = await cacheFiles({
        cache: true,
        files: [],
    });
    
    const name = 'hello';
    const place = {
        rule: 'hello',
        message: 'hello world',
    };
    
    fileCache.setInfo(name, [place], {hello: 'world'});
    
    t.ok(getFileDescriptor.calledWith(name), 'should call getFileDescriptor');
    t.end();
});

test('putout: cache-files: setInfo: definition not found', async (t) => {
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
    const cacheFiles = reRequire('.');
    
    const fileCache = await cacheFiles({
        cache: true,
        files: [],
    });
    
    const name = 'hello';
    const place = {
        rule: 'hello',
        message: `Definition for rule 'hello' was not found.`,
    };
    
    fileCache.setInfo(name, [place], {hello: 'world'});
    
    t.notOk(getFileDescriptor.called, 'should not call getFileDescriptor');
    t.end();
});

test('putout: cache-files: setInfo: eslint parser error', async (t) => {
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
    const cacheFiles = reRequire('.');
    
    const fileCache = await cacheFiles({
        cache: true,
        files: [],
    });
    
    const name = 'hello';
    const place = {
        rule: 'eslint/parser',
        message: `Can't find parser`,
    };
    
    fileCache.setInfo(name, [place], {hello: 'world'});
    
    t.notOk(getFileDescriptor.called, 'should not call getFileDescriptor');
    t.end();
});

test('putout: cache-files: enabled: setInfo: not set', async (t) => {
    const places = [];
    const meta = {
        optionsHash: 'hello',
        places,
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
    const cacheFiles = reRequire('.');
    
    const fileCache = await cacheFiles({
        cache: true,
        files: [],
    });
    
    const name = 'hello';
    const place = {
        rule: 'eslint/node/missing-require',
    };
    
    fileCache.setInfo(name, [place], {hello: 'world'});
    
    t.notOk(getFileDescriptor.called, 'should not call getFileDescriptor');
    t.end();
});

test('putout: cache-files: enabled: canUseCache: changed', async (t) => {
    const meta = {
        optionsHash: 'hello',
        places: ['world'],
    };
    
    const changed = true;
    
    const getFileDescriptor = stub().returns({
        meta,
        changed,
    });
    
    const createFromFile = stub().returns({
        getFileDescriptor,
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    mockRequire('file-entry-cache', fileEntryCache);
    const cacheFiles = reRequire('.');
    
    const fileCache = await cacheFiles({
        cache: true,
        files: [],
    });
    
    const name = 'hello';
    const fix = true;
    const options = {};
    
    fileCache.canUseCache({
        fix,
        name,
        options,
    });
    
    t.ok(getFileDescriptor.calledWith(name), 'should call getFileDescriptor');
    t.end();
});

test('putout: cache-files: enabled: canUseCache: options changed', async (t) => {
    const meta = {
        optionsHash: 'hello',
        places: ['world'],
    };
    
    const changed = false;
    
    const getFileDescriptor = stub().returns({
        meta,
        changed,
    });
    
    const createFromFile = stub().returns({
        getFileDescriptor,
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    mockRequire('file-entry-cache', fileEntryCache);
    const cacheFiles = reRequire('.');
    
    const fileCache = await cacheFiles({
        cache: true,
        files: [],
    });
    
    const name = 'hello';
    const fix = true;
    const options = {};
    
    fileCache.canUseCache({
        fix,
        name,
        options,
    });
    
    t.ok(getFileDescriptor.calledWith(name), 'should call getFileDescriptor');
    t.end();
});

test('putout: cache-files: enabled: canUseCache: not fix', async (t) => {
    const meta = {
        optionsHash: '1cnbekx',
        places: ['world'],
    };
    
    const changed = false;
    
    const getFileDescriptor = stub().returns({
        meta,
        changed,
    });
    
    const createFromFile = stub().returns({
        getFileDescriptor,
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    mockRequire('file-entry-cache', fileEntryCache);
    mockRequire('imurmurhash', stub().returns({
        result: stub().returns('1cnbekx'),
    }));
    
    const cacheFiles = reRequire('.');
    
    const fileCache = await cacheFiles({
        cache: true,
        files: [],
    });
    
    const name = 'hello';
    const fix = false;
    const options = {};
    
    const result = fileCache.canUseCache({
        fix,
        name,
        options,
    });
    
    t.ok(result);
    t.end();
});

test('putout: cache-files: enabled: canUseCache: fix, no places', async (t) => {
    const meta = {
        optionsHash: '1cnbekx',
        places: [],
    };
    
    const changed = false;
    
    const getFileDescriptor = stub().returns({
        meta,
        changed,
    });
    
    const createFromFile = stub().returns({
        getFileDescriptor,
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    mockRequire('file-entry-cache', fileEntryCache);
    mockRequire('imurmurhash', stub().returns({
        result: stub().returns('1cnbekx'),
    }));
    
    const cacheFiles = reRequire('.');
    
    const fileCache = await cacheFiles({
        cache: true,
        files: [],
    });
    
    const name = 'hello';
    const fix = true;
    const options = {};
    
    const result = fileCache.canUseCache({
        fix,
        name,
        options,
    });
    
    t.ok(result);
    t.end();
});

test('putout: cache-files: enabled: getOptionsHash: coverage', async (t) => {
    const meta = {
        optionsHash: '1cnbekx',
        places: [1],
    };
    
    const changed = false;
    
    const getFileDescriptor = stub().returns({
        meta,
        changed,
    });
    
    const createFromFile = stub().returns({
        getFileDescriptor,
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    mockRequire('file-entry-cache', fileEntryCache);
    const cacheFiles = reRequire('.');
    
    const fileCache = await cacheFiles({
        cache: true,
        files: [],
    });
    
    const name = 'hello';
    const fix = true;
    const options = {};
    
    fileCache.canUseCache({
        fix,
        name,
        options,
    });
    
    const result = fileCache.canUseCache({
        fix,
        name,
        options,
    });
    
    t.notOk(result);
    t.end();
});

test('putout: cache-files: enabled: getPlaces', async (t) => {
    const places = [];
    const meta = {
        optionsHash: '1cnbekx',
        places,
    };
    
    const changed = false;
    
    const getFileDescriptor = stub().returns({
        meta,
        changed,
    });
    
    const createFromFile = stub().returns({
        getFileDescriptor,
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    mockRequire('file-entry-cache', fileEntryCache);
    const cacheFiles = reRequire('.');
    
    const fileCache = await cacheFiles({
        cache: true,
        files: [],
    });
    
    const result = fileCache.getPlaces();
    
    t.equal(result, places, 'should places equal');
    t.end();
});

