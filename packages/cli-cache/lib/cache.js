'use strict';

const process = require('node:process');
const {unlink} = require('node:fs/promises');

const fileEntryCache = require('file-entry-cache');
const murmur = require('imurmurhash');
const stringify = require('json-stable-stringify-without-jsonify');
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

module.exports.createCache = async ({cache, fresh, version}) => {
    const name = await findCachePath();
    
    if (fresh)
        await tryToCatch(unlink, name);
    
    if (!cache)
        return defaultCache;
    
    const fileCache = fileEntryCache.createFromFile(name);
    
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
    
    const {findUp} = await import('find-up');
    
    if (await isChanged(fileCache, {findUp}))
        await tryToCatch(unlink, name);
    
    return fileCache;
};

module.exports._defaultCache = defaultCache;
module.exports._CACHE_FILE = CACHE_FILE;

const getPlaces = ({fileCache}) => (name) => fileCache.getFileDescriptor(name).meta.places;

const setInfo = ({fileCache, getOptionsHash}) => (name, places, options) => {
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

const canUseCache = ({fileCache, getOptionsHash}) => (name, options) => {
    const descriptor = fileCache.getFileDescriptor(name);
    
    if (!descriptor)
        return false;
    
    const {changed, meta} = descriptor;
    
    if (!meta)
        return false;
    
    const {places, optionsHash} = meta;
    
    if (changed)
        return false;
    
    if (optionsHash !== getOptionsHash(options))
        return false;
    
    return !places.length;
};

const hash = (a) => murmur(a).result()
    .toString(36);

const createGetOptionsCache = ({version}) => (options) => {
    if (!optionsHashCache.has(options))
        optionsHashCache.set(options, hash(`${version}_${nodeVersion}_${stringify(options)}`));
    
    return optionsHashCache.get(options);
};

async function findCachePath() {
    const findCacheDir = await simpleImport('find-cache-dir');
    const cacheDir = await findCacheDir({
        name: 'putout',
        create: true,
    });
    
    if (cacheDir)
        return `${cacheDir}/places.json`;
    
    return CACHE_FILE;
}
