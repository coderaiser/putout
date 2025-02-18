import process from 'node:process';
import {unlink as _unlink} from 'node:fs/promises';
import {createFromFile as _createFromFile} from 'file-entry-cache';
import _murmur from 'imurmurhash';
import stringify from 'json-stable-stringify-without-jsonify';
import tryCatch from 'try-catch';
import tryToCatch from 'try-to-catch';
import isNoDefinition from './is-no-definition.js';
import isParserError from './is-parser-error.js';
import containEslintPlugin from './contain-eslint-plugin.js';
import _isChanged from './is-changed.js';
import {findCacheDir as _findCacheDir} from './find-cache-dir.js';

const optionsHashCache = new WeakMap();
const nodeVersion = process.version;

const {assign} = Object;
const returns = (a) => () => a;

const defaultCache = {
    getPlaces: returns([]),
    setInfo: returns(),
    removeEntry: returns(),
    reconcile: returns(),
    canUseCache: returns(false),
};

export const createCache = async (overrides = {}) => {
    const {
        cache,
        fresh,
        version,
        again,
        createFromFile = _createFromFile,
        unlink = _unlink,
        findCachePath = _findCachePath,
        findCacheDir = _findCacheDir,
        isChanged = _isChanged,
        murmur = _murmur,
    } = overrides;
    
    const name = await findCachePath({
        findCacheDir,
    });
    
    if (!name)
        return defaultCache;
    
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
        murmur,
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
    
    const {findUp} = await import('./find-up.js');
    
    if (await isChanged(fileCache, {findUp}))
        await tryToCatch(unlink, name);
    
    return fileCache;
};

export const _defaultCache = defaultCache;

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

const hash = (a, murmur) => murmur(a)
    .result()
    .toString(36);

const createGetOptionsCache = ({version, murmur}) => (options) => {
    if (!optionsHashCache.has(options))
        optionsHashCache.set(options, hash(`${version}_${nodeVersion}_${stringify(options)}`, murmur));
    
    return optionsHashCache.get(options);
};

async function _findCachePath({findCacheDir}) {
    const cacheDir = await findCacheDir({
        name: 'putout',
    });
    
    if (cacheDir)
        return `${cacheDir}/places.json`;
    
    return '';
}
