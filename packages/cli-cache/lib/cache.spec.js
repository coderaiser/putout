'use strict';

const fs = require('node:fs/promises');

const {test, stub} = require('supertape');
const mockRequire = require('mock-require');

const {
    createCache,
    _CACHE_FILE,
    _defaultCache,
} = require('./cache');

const {reRequire, stopAll} = mockRequire;

test('putout: cli: cache: disabled: fileCache', async (t) => {
    const fileCache = await createCache({
        cache: false,
    });
    
    t.equal(fileCache, _defaultCache);
    t.end();
});

test('putout: cli: cache: fileCache: fresh', async (t) => {
    const unlink = stub();
    
    mockRequire('node:fs/promises', {
        ...fs,
        unlink,
    });
    
    const findCacheDir = stub().returns('node_modules/.cache');
    const simpleImport = stub().returns(findCacheDir);
    
    mockRequire('./simple-import', {
        simpleImport,
    });
    
    const {createCache} = reRequire('./cache');
    
    await createCache({
        fresh: true,
    });
    
    stopAll();
    const expected = 'node_modules/.cache/places.json';
    
    t.calledWith(unlink, [expected]);
    t.end();
});

test(`putout: cli: cache: find up can't find`, async (t) => {
    const unlink = stub();
    
    mockRequire('node:fs/promises', {
        ...fs,
        unlink,
    });
    
    const findCacheDir = stub();
    const simpleImport = stub().returns(findCacheDir);
    
    mockRequire('./simple-import', {
        simpleImport,
    });
    
    const {createCache} = reRequire('./cache');
    
    await createCache({
        fresh: true,
    });
    
    stopAll();
    
    t.calledWith(unlink, [_CACHE_FILE]);
    t.end();
});

test('putout: cli: cache: enabled: setInfo', async (t) => {
    const meta = {
        optionsHash: 'hello',
        places: ['world'],
    };
    
    const getFileDescriptor = stub().returns({
        meta,
    });
    
    const createFromFile = stub().returns({
        getFileDescriptor,
        reconcile: stub(),
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    mockRequire('./is-changed', stub());
    mockRequire('file-entry-cache', fileEntryCache);
    const {createCache} = reRequire('./cache');
    
    const fileCache = await createCache({
        cache: true,
        files: [],
    });
    
    const name = 'hello';
    
    const place = {
        rule: 'hello',
        message: 'hello world',
    };
    
    fileCache.setInfo(name, [place], {
        hello: 'world',
    });
    stopAll();
    
    t.calledWith(getFileDescriptor, [name], 'should call getFileDescriptor');
    t.end();
});

test('putout: cli: cache: setInfo: definition not found', async (t) => {
    const meta = {
        optionsHash: 'hello',
        places: ['world'],
    };
    
    const getFileDescriptor = stub().returns({
        meta,
    });
    
    const createFromFile = stub().returns({
        getFileDescriptor,
        reconcile: stub(),
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    mockRequire('./is-changed', stub());
    mockRequire('file-entry-cache', fileEntryCache);
    const {createCache} = reRequire('./cache');
    
    const fileCache = await createCache({
        cache: true,
        files: [],
    });
    
    const name = 'hello';
    
    const place = {
        rule: 'hello',
        message: `Definition for rule 'hello' was not found.`,
    };
    
    fileCache.setInfo(name, [place], {
        hello: 'world',
    });
    stopAll();
    
    t.notCalled(getFileDescriptor, 'should not call getFileDescriptor');
    t.end();
});

test('putout: cli: cache: setInfo: eslint parser error', async (t) => {
    const meta = {
        optionsHash: 'hello',
        places: ['world'],
    };
    
    const getFileDescriptor = stub().returns({
        meta,
    });
    
    const createFromFile = stub().returns({
        getFileDescriptor,
        reconcile: stub(),
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    mockRequire('./is-changed', stub());
    mockRequire('file-entry-cache', fileEntryCache);
    const {createCache} = reRequire('./cache');
    
    const fileCache = await createCache({
        cache: true,
        files: [],
    });
    
    const name = 'hello';
    
    const place = {
        rule: 'eslint/parser',
        message: `Can't find parser`,
    };
    
    fileCache.setInfo(name, [place], {
        hello: 'world',
    });
    stopAll();
    
    t.notCalled(getFileDescriptor, 'should not call getFileDescriptor');
    t.end();
});

test('putout: cli: cache: enabled: setInfo: not set', async (t) => {
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
        reconcile: stub(),
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    mockRequire('./is-changed', stub());
    mockRequire('file-entry-cache', fileEntryCache);
    const {createCache} = reRequire('./cache');
    
    const fileCache = await createCache({
        cache: true,
        files: [],
    });
    
    const name = 'hello';
    
    const place = {
        rule: 'node/missing-require (eslint)',
    };
    
    fileCache.setInfo(name, [place], {
        hello: 'world',
    });
    stopAll();
    
    t.notCalled(getFileDescriptor, 'should not call getFileDescriptor');
    t.end();
});

test('putout: cli: cache: enabled: canUseCache: mtime changed', async (t) => {
    const data = {
        mtime: 123,
        optionsHash: 'hello',
        places: ['world'],
    };
    
    const meta = {
        data,
        mtime: 1,
    };
    
    const changed = false;
    
    const getFileDescriptor = stub().returns({
        meta,
        changed,
    });
    
    const createFromFile = stub().returns({
        getFileDescriptor,
        reconcile: stub(),
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    mockRequire('./is-changed', stub());
    mockRequire('file-entry-cache', fileEntryCache);
    const {createCache} = reRequire('./cache');
    
    const fileCache = await createCache({
        cache: true,
        files: [],
    });
    
    const name = 'hello';
    const options = {};
    
    const result = fileCache.canUseCache(name, options);
    stopAll();
    
    t.notOk(result);
    t.end();
});

test('putout: cli: cache: enabled: canUseCache: changed', async (t) => {
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
        reconcile: stub(),
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    mockRequire('./is-changed', stub());
    mockRequire('file-entry-cache', fileEntryCache);
    const {createCache} = reRequire('./cache');
    
    const fileCache = await createCache({
        cache: true,
        files: [],
    });
    
    const name = 'hello';
    const options = {};
    
    fileCache.canUseCache(name, options);
    stopAll();
    
    t.calledWith(getFileDescriptor, [name], 'should call getFileDescriptor');
    t.end();
});

test('putout: cli: cache: enabled: canUseCache: no data', async (t) => {
    const meta = {
        data: null,
    };
    
    const changed = true;
    
    const getFileDescriptor = stub().returns({
        meta,
        changed,
    });
    
    const createFromFile = stub().returns({
        getFileDescriptor,
        reconcile: stub(),
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    mockRequire('./is-changed', stub());
    mockRequire('file-entry-cache', fileEntryCache);
    const {createCache} = reRequire('./cache');
    
    const fileCache = await createCache({
        cache: true,
        files: [],
    });
    
    const name = 'hello';
    const options = {};
    
    const result = fileCache.canUseCache(name, options);
    
    stopAll();
    
    t.notOk(result);
    t.end();
});

test('putout: cli: cache: enabled: canUseCache: no descriptor', async (t) => {
    const getFileDescriptor = stub().returns(null);
    
    const createFromFile = stub().returns({
        getFileDescriptor,
        reconcile: stub(),
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    mockRequire('./is-changed', stub());
    mockRequire('file-entry-cache', fileEntryCache);
    const {createCache} = reRequire('./cache');
    
    const fileCache = await createCache({
        cache: true,
        files: [],
    });
    
    const name = 'hello';
    const options = {};
    
    fileCache.canUseCache(name, options);
    stopAll();
    
    t.calledWith(getFileDescriptor, [name], 'should call getFileDescriptor');
    t.end();
});

test('putout: cli: cache: enabled: canUseCache: options changed', async (t) => {
    const data = {
        optionsHash: 'hello',
        places: ['world'],
    };
    
    const meta = {
        data,
    };
    
    const changed = false;
    
    const getFileDescriptor = stub().returns({
        meta,
        changed,
    });
    
    const createFromFile = stub().returns({
        getFileDescriptor,
        reconcile: stub(),
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    mockRequire('./is-changed', stub());
    mockRequire('file-entry-cache', fileEntryCache);
    const {createCache} = reRequire('./cache');
    
    const fileCache = await createCache({
        cache: true,
        files: [],
    });
    
    const name = 'hello';
    const options = {};
    
    fileCache.canUseCache(name, options);
    stopAll();
    
    t.calledWith(getFileDescriptor, [name], 'should call getFileDescriptor');
    t.end();
});

test('putout: cli: cache: enabled: canUseCache: not fix', async (t) => {
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
        reconcile: stub(),
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    mockRequire('./is-changed', stub());
    mockRequire('file-entry-cache', fileEntryCache);
    mockRequire('imurmurhash', stub().returns({
        result: stub().returns('1cnbekx'),
    }));
    
    const {createCache} = reRequire('./cache');
    
    const fileCache = await createCache({
        cache: true,
        files: [],
    });
    
    const name = 'hello';
    const options = {};
    
    const result = fileCache.canUseCache(name, options);
    
    stopAll();
    
    t.notOk(result);
    t.end();
});

test('putout: cli: cache: enabled: canUseCache: fix, no places', async (t) => {
    const data = {
        optionsHash: '1cnbekx',
        places: [],
    };
    
    const meta = {
        data,
    };
    
    const changed = false;
    
    const getFileDescriptor = stub().returns({
        meta,
        changed,
    });
    
    const createFromFile = stub().returns({
        getFileDescriptor,
        reconcile: stub(),
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    mockRequire('./is-changed', stub());
    mockRequire('file-entry-cache', fileEntryCache);
    mockRequire('imurmurhash', stub().returns({
        result: stub().returns('1cnbekx'),
    }));
    
    const {createCache} = reRequire('./cache');
    
    const fileCache = await createCache({
        cache: true,
        files: [],
    });
    
    const name = 'hello';
    const options = {};
    
    const result = fileCache.canUseCache(name, options);
    
    stopAll();
    
    t.ok(result);
    t.end();
});

test('putout: cli: cache: enabled: getPlaces: isChanged: no', async (t) => {
    const places = [];
    const data = {
        optionsHash: '1cnbekx',
        places,
    };
    
    const meta = {
        data,
    };
    
    const changed = false;
    
    const getFileDescriptor = stub().returns({
        meta,
        changed,
    });
    
    const reconcile = stub();
    
    const createFromFile = stub().returns({
        getFileDescriptor,
        reconcile,
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    mockRequire('./is-changed', stub().returns(false));
    mockRequire('file-entry-cache', fileEntryCache);
    const {createCache} = reRequire('./cache');
    
    const fileCache = await createCache({
        cache: true,
        files: [],
    });
    
    const result = fileCache.getPlaces();
    
    stopAll();
    
    t.equal(result, places, 'should places equal');
    t.end();
});

test('putout: cli: cache: enabled: getPlaces: isChanged: yes', async (t) => {
    const places = [];
    const data = {
        optionsHash: '1cnbekx',
        places,
    };
    
    const meta = {
        data,
    };
    
    const changed = false;
    
    const getFileDescriptor = stub().returns({
        meta,
        changed,
    });
    
    const reconcile = stub();
    
    const createFromFile = stub().returns({
        getFileDescriptor,
        reconcile,
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    mockRequire('./is-changed', stub().returns(true));
    mockRequire('file-entry-cache', fileEntryCache);
    const {createCache} = reRequire('./cache');
    
    const fileCache = await createCache({
        cache: true,
        files: [],
    });
    
    const result = fileCache.getPlaces();
    
    stopAll();
    
    t.equal(result, places, 'should places equal');
    t.end();
});

test('putout: cli: cache: throws: always', async (t) => {
    const createFromFile = stub().throws(Error('x'));
    
    const fileCache = await createCache({
        cache: true,
        files: [],
        createFromFile,
    });
    
    t.equal(fileCache, _defaultCache);
    t.end();
});

test('putout: cli: cache: throws: unlink', async (t) => {
    const name = '/cli-cache/node_modules/.cache/putout/places.json';
    
    const createFromFile = stub().throws(Error('x'));
    const unlink = stub();
    const findCachePath = stub().returns(name);
    
    await createCache({
        cache: true,
        files: [],
        createFromFile,
        findCachePath,
        unlink,
    });
    
    t.calledWith(unlink, [name]);
    t.end();
});
