'use strict';

const {unlink} = require('fs/promises');

const fileEntryCache = require('file-entry-cache');
const findCacheDir = require('find-cache-dir');
const murmur = require('imurmurhash');
const stringify = require('json-stable-stringify-without-jsonify');
const tryToCatch = require('try-to-catch');

const {version} = require('../../../package.json');
const isNoDefinition = require('./is-no-definition');
const isParserError = require('./is-parser-error');
const containEslintPlugin = require('../eslint/contain-eslint-plugin');
const isChanged = require('./is-changed');

const optionsHashCache = new WeakMap();
const nodeVersion = process.version;

const {assign} = Object;
const returns = (a) => () => a;
const CACHE_FILE = '.putoutcache';

const defaultFileCache = {
    getPlaces: returns([]),
    setInfo: returns(),
    removeEntry: returns(),
    reconcile: returns(),
    canUseCache: returns(false),
};

module.exports = async ({cache, fresh}) => {
    const name = await findCachePath();
    
    if (fresh)
        await tryToCatch(unlink, name);
    
    if (!cache)
        return defaultFileCache;
    
    const fileCache = fileEntryCache.createFromFile(name);
    
    assign(fileCache, {
        getPlaces: getPlaces(fileCache),
        getOptionsHash,
        setInfo: setInfo(fileCache),
        canUseCache: canUseCache(fileCache),
    });
    
    const {findUp} = await import('find-up');
    
    if (await isChanged(fileCache, {findUp}))
        await tryToCatch(unlink, name);
    
    return fileCache;
};

module.exports._defaultFileCache = defaultFileCache;
module.exports._CACHE_FILE = CACHE_FILE;

const getPlaces = (fileCache) => (name) => fileCache.getFileDescriptor(name).meta.places;

const setInfo = (fileCache) => (name, places, options) => {
    if (containEslintPlugin(places))
        return;
    
    if (isNoDefinition(places))
        return;
    
    if (isParserError(places))
        return;
    
    const {meta} = fileCache.getFileDescriptor(name);
    
    meta.optionsHash = getOptionsHash(options);
    meta.places = places;
};

const canUseCache = (fileCache) => ({name, options}) => {
    const {changed, meta} = fileCache.getFileDescriptor(name);
    const {
        places,
        optionsHash,
    } = meta;
    
    if (changed)
        return false;
    
    if (optionsHash !== getOptionsHash(options))
        return false;
    
    return !places.length;
};

const hash = (a) => murmur(a).result().toString(36);

function getOptionsHash(options) {
    if (!optionsHashCache.has(options)) {
        optionsHashCache.set(options, hash(`${version}_${nodeVersion}_${stringify(options)}`));
    }
    
    return optionsHashCache.get(options);
}

async function findCachePath() {
    const cacheDir = await findCacheDir({
        name: 'putout',
        create: true,
    });
    
    if (cacheDir)
        return `${cacheDir}/places`;
    
    return CACHE_FILE;
}

