'use strict';

const process = require('node:process');
const {unlink: _unlink} = require('node:fs/promises');

const {createFromFile: _createFromFile} = require('file-entry-cache');
const murmur = require('imurmurhash');
const stringify = require('json-stable-stringify-without-jsonify');
const tryCatch = require('try-catch');
const tryToCatch = require('try-to-catch');

const isNoDefinition = require('./is-no-definition');
const isParserError = require('./is-parser-error');
const containEslintPlugin = require('./contain-eslint-plugin');
const isChanged = require('./is-changed');
const {simpleImport} = require('./simple-import');

const optionsHashCache = new WeakMap();
const nodeVersion = process.version;

const {assign} = Object;
const returns = (a) => () => a;
const CACHE_FILE = '.putoutcache.json';

const defaultCache = {
    getPlaces: returns([]),
    setInfo: returns(),
    removeEntry: returns(),
    reconcile: returns(),
    canUseCache: returns(false),
};

const createCache = async (overrides = {}) => {
    const {
        cache,
        fresh,
        version,
        again,
        createFromFile = _createFromFile,
        unlink = _unlink,
        findCachePath = _findCachePath,
    } = overrides;
    
    const name = await findCachePath();
    
    if (fresh)
        await tryToCatch(unlink, name);
    
    if (!cache)
        return defaultCache;
    
    const [error, fileCache] = tryCatch(createFromFile, name);
    
    if (error) {
        if (again)
            return defaultCache;
        
        await tryToCatch(unlink, name);
        return createCache({
            cache,
            fresh,
            version,
            createFromFile,
            again: true,
        });
    }
    
    const getOptionsHash = createGetOptionsCache({
        version,
    });
    
    assign(fileCache, {
        getPlaces: getPlaces({
            fileCache,
        }),
        getOptionsHash,
        setInfo: setInfo({
            fileCache,
            getOptionsHash,
        }),
        canUseCache: canUseCache({
            fileCache,
            getOptionsHash,
        }),
    });
    
    const {findUp} = await import('./find-up.mjs');
    
    if (await isChanged(fileCache, {findUp}))
        await tryToCatch(unlink, name);
    
    return fileCache;
};

module.exports.createCache = createCache;
module.exports._defaultCache = defaultCache;
module.exports._CACHE_FILE = CACHE_FILE;

const getPlaces = ({fileCache}) => (name) => fileCache.getFileDescriptor(name).meta.data.places;

const setInfo = ({fileCache, getOptionsHash}) => (name, places, options) => {
    if (containEslintPlugin(places))
        return;
    
    if (isNoDefinition(places))
        return;
    
    if (isParserError(places))
        return;
    
    const {meta} = fileCache.getFileDescriptor(name);
    
    meta.data = {};
    
    meta.data.optionsHash = getOptionsHash(options);
    meta.data.places = places;
    meta.data.mtime = meta.mtime;
};

const canUseCache = ({fileCache, getOptionsHash}) => (name, options) => {
    const descriptor = fileCache.getFileDescriptor(name);
    
    if (!descriptor)
        return false;
    
    const {changed, meta} = descriptor;
    
    if (changed)
        return false;
    
    const {data} = meta;
    
    if (!data)
        return false;
    
    if (meta.mtime !== data.mtime)
        return false;
    
    const {places, optionsHash} = data;
    
    if (optionsHash !== getOptionsHash(options))
        return false;
    
    return !places.length;
};

const hash = (a) => murmur(a)
    .result()
    .toString(36);

const createGetOptionsCache = ({version}) => (options) => {
    if (!optionsHashCache.has(options))
        optionsHashCache.set(options, hash(`${version}_${nodeVersion}_${stringify(options)}`));
    
    return optionsHashCache.get(options);
};

async function _findCachePath() {
    const {findCacheDir} = await simpleImport('./find-cache-dir.mjs');
    
    const cacheDir = await findCacheDir({
        name: 'putout',
    });
    
    if (cacheDir)
        return `${cacheDir}/places.json`;
    
    return CACHE_FILE;
}
