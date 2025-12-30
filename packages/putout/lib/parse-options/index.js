'use strict';

const process = require('node:process');
const {homedir: _homedir} = require('node:os');
const {readdirSync: _readdirSync} = require('node:fs');

const {dirname, join} = require('node:path');

const once = require('once');
const tryCatch = require('try-catch');
const _escalade = require('escalade/sync');

const {parseMatch} = require('./parse-match');
const _defaultOptions = require('../../putout.json');
const {mergeOptions} = require('./merge-options');
const _recursiveRead = require('./recursive-read');
const applyModuleTypeRules = require('./apply-module-type-rules');
const {validateOptions} = require('./validate-options');
const {readRules} = require('./read-rules');

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
        defaultOptions = _defaultOptions,
        recursiveRead = _recursiveRead,
        homedir = _homedir,
        escalade = _escalade,
        readPackageJson,
    } = overrides;
    
    const [dir, customOptions] = readOptions(name, {
        recursiveRead,
        escalade,
        readPackageJson,
    });
    
    const homeOptions = readHomeOptions({
        homedir,
    });
    
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
            homedir,
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

function _readPackageJson(name, overrides) {
    const {escalade} = overrides;
    const [, packagePath] = tryCatch(escalade, name, includes('package.json'));
    
    if (packagePath)
        return [packagePath, require(packagePath)];
    
    return [
        '',
        null,
    ];
}

function _readOptions(name, overrides = {}) {
    const {
        recursiveRead,
        escalade,
        readPackageJson = _readPackageJson,
    } = overrides;
    const [dir, options] = recursiveRead(name, '.putout.json');
    const [packagePath, packageJson] = readPackageJson(name, {
        escalade,
    });
    
    if (packagePath)
        applyModuleTypeRules(packageJson, options);
    
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

const _readHomeOptions = once(({homedir}) => {
    const home = homedir();
    const name = join(home, '.putout.json');
    const [, data = {}] = tryCatch(require, name);
    
    return data;
});

const _readCodeMods = ({cwd, readdirSync, homedir}) => {
    const home = homedir();
    
    return readRules(home, '.putout', {
        cwd,
        readdirSync,
    });
};
