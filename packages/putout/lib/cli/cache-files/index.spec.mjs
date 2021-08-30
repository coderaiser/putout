import {createMockImport} from 'mock-import';

const {
    mockImport,
    reImport,
    stopAll,
} = createMockImport(import.meta.url);

import fs from 'fs/promises';

import test from 'supertape';
import stub from '@cloudcmd/stub';

import {
    cacheFiles,
    _CACHE_FILE,
    _defaultFileCache,
} from './index.mjs';

test('putout: cache-files: disabled: fileCache', async (t) => {
    const fileCache = await cacheFiles({
        cache: false,
    });
    
    t.equal(fileCache, _defaultFileCache);
    t.end();
});

test('putout: cache-files: fileCache: fresh', async (t) => {
    const unlink = stub();
    
    mockImport('fs/promises', {
        ...fs,
        unlink,
    });
    
    mockImport('find-cache-dir', stub().returns('node_modules/.cache'));
    const {cacheFiles} = await reImport('./index.mjs');
    
    await cacheFiles({
        fresh: true,
    });
    
    stopAll();
    const expected = 'node_modules/.cache/places';
    
    t.calledWith(unlink, [expected]);
    t.end();
});

test(`putout: cache-files: find up can't find`, async (t) => {
    const unlink = stub();
    
    mockImport('fs/promises', {
        ...fs,
        unlink,
    });
    
    mockImport('find-cache-dir', stub());
    const {cacheFiles} = await reImport('./index.mjs');
    
    await cacheFiles({
        fresh: true,
    });
    
    stopAll();
    
    t.calledWith(unlink, [_CACHE_FILE]);
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
        reconcile: stub(),
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    const isChanged = stub();
    
    mockImport('./is-changed.mjs', {isChanged});
    mockImport('file-entry-cache', fileEntryCache);
    const {cacheFiles} = await reImport('./index.mjs');
    
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
    stopAll();
    
    t.calledWith(getFileDescriptor, [name], 'should call getFileDescriptor');
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
        reconcile: stub(),
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    const isChanged = stub();
    
    mockImport('./is-changed.mjs', {isChanged});
    mockImport('file-entry-cache', fileEntryCache);
    const {cacheFiles} = await reImport('./index.mjs');
    
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
    stopAll();
    
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
        reconcile: stub(),
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    const isChanged = stub();
    
    mockImport('./is-changed.mjs', {isChanged});
    mockImport('file-entry-cache', fileEntryCache);
    const {cacheFiles} = await reImport('./index.mjs');
    
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
    stopAll();
    
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
        reconcile: stub(),
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    const isChanged = stub();
    
    mockImport('./is-changed.mjs', {isChanged});
    mockImport('file-entry-cache', fileEntryCache);
    const {cacheFiles} = await reImport('./index.mjs');
    
    const fileCache = await cacheFiles({
        cache: true,
        files: [],
    });
    
    const name = 'hello';
    const place = {
        rule: 'node/missing-require (eslint)',
    };
    
    fileCache.setInfo(name, [place], {hello: 'world'});
    stopAll();
    
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
        reconcile: stub(),
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    const isChanged = stub();
    
    mockImport('./is-changed.mjs', {isChanged});
    mockImport('file-entry-cache', fileEntryCache);
    const {cacheFiles} = await reImport('./index.mjs');
    
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
    stopAll();
    
    t.calledWith(getFileDescriptor, [name], 'should call getFileDescriptor');
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
        reconcile: stub(),
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    const isChanged = stub();
    
    mockImport('./is-changed.mjs', {isChanged});
    mockImport('file-entry-cache', fileEntryCache);
    const {cacheFiles} = await reImport('./index.mjs');
    
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
    stopAll();
    
    t.calledWith(getFileDescriptor, [name], 'should call getFileDescriptor');
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
        reconcile: stub(),
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    const isChanged = stub();
    
    mockImport('./is-changed.mjs', {isChanged});
    mockImport('file-entry-cache', fileEntryCache);
    mockImport('imurmurhash', stub().returns({
        result: stub().returns('1cnbekx'),
    }));
    
    const {cacheFiles} = await reImport('./index.mjs');
    
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
    stopAll();
    
    t.notOk(result);
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
        reconcile: stub(),
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    const isChanged = stub();
    
    mockImport('./is-changed.mjs', {isChanged});
    mockImport('file-entry-cache', fileEntryCache);
    mockImport('imurmurhash', stub().returns({
        result: stub().returns('1cnbekx'),
    }));
    
    const {cacheFiles} = await reImport('./index.mjs');
    
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
    stopAll();
    
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
        reconcile: stub(),
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    const isChanged = stub();
    
    mockImport('./is-changed.mjs', {isChanged});
    mockImport('file-entry-cache', fileEntryCache);
    const {cacheFiles} = await reImport('./index.mjs');
    
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
    stopAll();
    
    t.notOk(result);
    t.end();
});

test('putout: cache-files: enabled: getPlaces: isChanged: no', async (t) => {
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
    
    const reconcile = stub();
    const createFromFile = stub().returns({
        getFileDescriptor,
        reconcile,
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    const isChanged = stub().returns(false);
    
    mockImport('./is-changed.mjs', {isChanged});
    mockImport('file-entry-cache', fileEntryCache);
    const {cacheFiles} = await reImport('./index.mjs');
    
    const fileCache = await cacheFiles({
        cache: true,
        files: [],
    });
    
    const result = fileCache.getPlaces();
    stopAll();
    
    t.equal(result, places, 'should places equal');
    t.end();
});

test('putout: cache-files: enabled: getPlaces: isChanged: yes', async (t) => {
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
    
    const reconcile = stub();
    const createFromFile = stub().returns({
        getFileDescriptor,
        reconcile,
    });
    
    const fileEntryCache = {
        createFromFile,
    };
    
    const isChanged = stub().returns(true);
    
    mockImport('./is-changed.mjs', {isChanged});
    mockImport('file-entry-cache', fileEntryCache);
    const {cacheFiles} = await reImport('./index.mjs');
    
    const fileCache = await cacheFiles({
        cache: true,
        files: [],
    });
    
    const result = fileCache.getPlaces();
    stopAll();
    
    t.equal(result, places, 'should places equal');
    t.end();
});

