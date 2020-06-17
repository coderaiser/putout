'use strict';

const {homedir} = require('os');
const {readdirSync} = require('fs');
const {
    dirname,
    join,
    relative,
} = require('path');

const once = require('once');
const tryCatch = require('try-catch');
const findUp = require('find-up');

const parseMatch = require('./parse-match');
const defaultOptions = require('../../putout.json');
const merge = require('../merge');

const home = homedir();
const cwd = process.cwd();

module.exports = (info = {}) => {
    const {
        rulesdir,
        name = '',
        options = {},
        readOptions = _readOptions,
        readHomeOptions = _readHomeOptions,
        readCodeMods = _readCodeMods,
    } = info;
    
    const [dir, customOptions] = readOptions(dirname(name));
    const homeOptions = readHomeOptions();
    const relativeName = relative(cwd, name);
    
    const defaultMatch = parseMatch(relativeName, defaultOptions.match);
    const mergedOptions = merge(
        defaultOptions,
        homeOptions,
        defaultMatch,
        customOptions,
        options,
    );
    
    const mergedMatch = parseMatch(relativeName, mergedOptions.match);
    const customMatch = parseMatch(relativeName, options.match);
    
    const resultOptions = merge(
        readCodeMods(),
        readRules(dir, rulesdir),
        mergedMatch,
        mergedOptions,
        customMatch,
    );
    
    return {
        ...resultOptions,
        dir,
    };
};

function _readOptions(cwd) {
    const putoutPath = findUp.sync('.putout.json', {
        cwd,
    });
    
    if (putoutPath)
        return [
            dirname(putoutPath),
            require(putoutPath),
        ];
    
    const packagePath = findUp.sync('package.json', {
        cwd,
    });
    
    if (packagePath)
        return [
            dirname(packagePath),
            require(packagePath).putout || {},
        ];
    
    return [
        '',
        {},
    ];
}

const isInclude = (a) => a !== 'node_modules';

const readRules = once((dirOpt, rulesDir) => {
    if (!rulesDir)
        return {};
    
    const dir = join(dirOpt, rulesDir);
    const [e, names] = tryCatch(readdirSync, dir);
    
    if (e)
        return {};
    
    const plugins = [];
    
    for (const name of names.filter(isInclude)) {
        const full = join(dir, name);
        const plugin = require(full);
        const shortName = name.replace('putout-plugin-');
        
        plugins.push([shortName, plugin]);
    }
    
    return {
        plugins,
    };
});

const _readHomeOptions = once(() => {
    const name = join(home, '.putout.json');
    const [, data = {}] = tryCatch(require, name);
    
    return data;
});

const _readCodeMods = once(() => {
    return readRules(home, '.putout');
});

