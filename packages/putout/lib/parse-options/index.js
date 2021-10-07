'use strict';

const {homedir} = require('os');
const {readdirSync} = require('fs');
const {
    dirname,
    join,
} = require('path');

const once = require('once');
const tryCatch = require('try-catch');
const escalade = require('escalade/sync');

const parseMatch = require('./parse-match');
const defaultOptions = require('../../putout.json');
const merge = require('../merge');
const recursiveRead = require('./recursive-read');
const applyModuleTypeRules = require('./apply-module-type-rules');

const home = homedir();

module.exports = (info = {}) => {
    const {
        rulesdir,
        name = '',
        options = {},
        readOptions = _readOptions,
        readHomeOptions = _readHomeOptions,
        readCodeMods = _readCodeMods,
    } = info;
    
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
    
    const mergedOptions = merge(...optionsList);
    const mergedDefaultsMatch = merge(
        mergedOptions,
        parseMatch(name, mergedOptions.match),
        options,
    );
    
    const mergedMatch = merge(...[
        customOptions,
        options,
        parseMatch(name, options.match),
    ]);
    
    const resultOptions = merge(
        readCodeMods(),
        readRules(dir, rulesdir),
        mergedOptions,
        mergedDefaultsMatch,
        mergedMatch,
    );
    
    return {
        ...resultOptions,
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
    
    return [
        '',
        {},
    ];
}

const isInclude = (a) => a !== 'node_modules';

function readRules(dirOpt, rulesDir) {
    if (!rulesDir)
        return {};
    
    let dir = join(dirOpt, rulesDir);
    
    if (!/^\//.test(dir))
        dir = join(process.cwd(), rulesDir);
    
    const [e, names] = tryCatch(readdirSync, dir);
    
    if (e)
        return {};
    
    const plugins = [];
    
    for (const name of names.filter(isInclude)) {
        const full = join(dir, name);
        const plugin = require(full);
        const shortName = name.replace('putout-plugin-', '');
        
        plugins.push([shortName, plugin]);
    }
    
    return {
        plugins,
    };
}

const _readHomeOptions = once(() => {
    const name = join(home, '.putout.json');
    const [, data = {}] = tryCatch(require, name);
    
    return data;
});

const _readCodeMods = once(() => {
    return readRules(home, '.putout');
});

