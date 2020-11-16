'use strict';

const {unlinkSync} = require('fs');

const fileEntryCache = require('file-entry-cache');
const murmur = require('imurmurhash');
const stringify = require('json-stringify-deterministic');
const tryCatch = require('try-catch');
const findUp = require('find-up');

const {version} = require('../../../package.json');
const isNoDefinition = require('./is-no-definition');
const isParserError = require('./is-parser-error');
const containEslintPlugin = require('../eslint/contain-eslint-plugin');

const optionsHashCache = new WeakMap();
const nodeVersion = process.version;

const {assign} = Object;
const noop = () => {};

const defaultFileCache = {
    getPlaces: noop,
    setInfo: noop,
    removeEntry: noop,
    reconcile: noop,
    canUseCache: () => false,
};

const CACHE_FILE = '.putoutcache';

module.exports = async ({cache, fresh}) => {
    const name = await findUp(CACHE_FILE) || CACHE_FILE;
    
    if (fresh)
        tryCatch(unlinkSync, name);
    
    if (!cache)
        return defaultFileCache;
    
    const fileCache = fileEntryCache.createFromFile(name);
    
    assign(fileCache, {
        getPlaces: getPlaces(fileCache),
        getOptionsHash,
        setInfo: setInfo(fileCache),
        canUseCache: canUseCache(fileCache),
    });
    
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

const canUseCache = (fileCache) => ({fix, name, options}) => {
    const {changed, meta} = fileCache.getFileDescriptor(name);
    const {
        places,
        optionsHash,
    } = meta;
    
    if (changed)
        return false;
    
    if (optionsHash !== getOptionsHash(options))
        return false;
    
    if (!fix)
        return true;
    
    return fix && !places.length;
};

const hash = (a) => murmur(a).result().toString(36);

function getOptionsHash(options) {
    if (!optionsHashCache.has(options)) {
        optionsHashCache.set(options, hash(`${version}_${nodeVersion}_${stringify(options)}`));
    }
    
    return optionsHashCache.get(options);
}

