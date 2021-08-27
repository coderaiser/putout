import {unlink} from 'fs/promises';

import fileEntryCache from 'file-entry-cache';
import findCacheDir from 'find-cache-dir';
import murmur from 'imurmurhash';
import stringify from 'json-stringify-deterministic';
import tryToCatch from 'try-to-catch';
import {createCommons} from 'simport';

import isNoDefinition from './is-no-definition.js';
import isParserError from './is-parser-error.js';
import containEslintPlugin from '../eslint/contain-eslint-plugin.js';
import {isChanged} from './is-changed.mjs';

const {require} = createCommons(import.meta.url);
const {version} = require('../../../package.json');

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

export async function cacheFiles({cache, fresh}) {
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
    
    if (await isChanged(fileCache))
        await tryToCatch(unlink, name);
    
    return fileCache;
};

export const _defaultFileCache = defaultFileCache;
export const _CACHE_FILE = CACHE_FILE;

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

