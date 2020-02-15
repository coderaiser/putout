'use strict';

const fileEntryCache = require('file-entry-cache');
const murmur = require('imurmurhash');
const stringify = require('json-stringify-deterministic');

const {version} = require('../../package.json');
const containEslintPlugin = require('./cache-files/contain-eslint-plugin');

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

module.exports = ({cache}) => {
    if (!cache)
        return defaultFileCache;
    
    const fileCache = fileEntryCache.createFromFile('.putoutcache');
    
    assign(fileCache, {
        getPlaces: getPlaces(fileCache),
        getOptionsHash,
        setInfo: setInfo(fileCache),
        canUseCache: canUseCache(fileCache),
    });
    
    return fileCache;
};

module.exports._defaultFileCache = defaultFileCache;

const getPlaces = (fileCache) => (name) => fileCache.getFileDescriptor(name).meta.places;

const setInfo = (fileCache) => (name, places, options) => {
    if (containEslintPlugin(places))
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
    
    if (fix && !places.length)
        return true;
    
    return false;
};

const hash = (a) => murmur(a).result().toString(36);

function getOptionsHash(options) {
    if (!optionsHashCache.has(options)) {
        optionsHashCache.set(options, hash(`${version}_${nodeVersion}_${stringify(options)}`));
    }
    
    return optionsHashCache.get(options);
}

