'use strict';

const process = require('node:process');
const {homedir} = require('node:os');
const {readdirSync: _readdirSync} = require('node:fs');

const {dirname, join} = require('node:path');

const once = require('once');
const tryCatch = require('try-catch');
const escalade = require('escalade/sync');

const {parseMatch} = require('./parse-match');
const defaultOptions = require('../../putout.json');
const {mergeOptions} = require('./merge-options');
const recursiveRead = require('./recursive-read');
const applyModuleTypeRules = require('./apply-module-type-rules');
const {validateOptions} = require('./validate-options');
const {readRules} = require('./read-rules');

const home = homedir();

module.exports = (info = {}, overrides = {}) => {
    const {
        rulesdir,
        name = '',
        options = {},
        readOptions = _readOptions,
        readHomeOptions = _readHomeOptions,
        readCodeMods = _readCodeMods,
    } = info;
    
    const {
        cwd = process.cwd(),
        readdirSync = _readdirSync,
    } = overrides;
    
    const [dir, customOptions] = readOptions(name);
    const homeOptions = readHomeOptions();
    const defaultMatch = parseMatch(name, defaultOptions.match);
    
    const optionsList = [
        defaultOptions,
        homeOptions,
        defaultMatch,
        customOptions,
        options,
    ];
    
    const mergedOptions = mergeOptions(...optionsList);
    
    const mergedDefaultsMatch = mergeOptions(
        mergedOptions,
        parseMatch(
            name,
            mergedOptions.match,
        ),
        options,
    );
    
    const mergedMatch = mergeOptions(customOptions, options, parseMatch(name, options.match));
    
    const resultOptionsList = [
        readCodeMods({
            cwd,
            readdirSync,
        }),
        readRules('./', rulesdir, {
            cwd,
            readdirSync,
        }),
        mergedOptions,
        mergedDefaultsMatch,
        mergedMatch,
    ];
    
    const finalMergedOptions = mergeOptions(...resultOptionsList);
    
    validateOptions(finalMergedOptions);
    
    return {
        ...finalMergedOptions,
        dir,
    };
};

const includes = (name) => (dir, names) => names.includes(name) && name;

function _readOptions(name) {
    const [dir, options] = recursiveRead(name, '.putout.json');
    const [, packagePath] = tryCatch(escalade, name, includes('package.json'));
    
    if (packagePath)
        applyModuleTypeRules(require(packagePath), options);
    
    if (dir)
        return [dir, options];
    
    if (packagePath)
        return [
            dirname(packagePath), {
                ...options,
                ...require(packagePath).putout,
            },
        ];
    
    return ['', {}];
}

const _readHomeOptions = once(() => {
    const name = join(home, '.putout.json');
    const [, data = {}] = tryCatch(require, name);
    
    return data;
});

const _readCodeMods = once(({cwd, readdirSync}) => readRules(home, '.putout', {
    cwd,
    readdirSync,
}));
