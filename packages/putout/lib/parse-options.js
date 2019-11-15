'use strict';

const {homedir} = require('os');
const {
    dirname,
    join,
    relative,
} = require('path');
const {readdirSync} = require('fs');

const once = require('once');
const tryCatch = require('try-catch');
const findUp = require('find-up');

const merge = require('./merge');
const parseMatch = require('./parse-match');
const defaultOptions = require('../putout.json');

const home = homedir();
const cwd = process.cwd();

const readHomeOptions = once(_readHomeOptions);
const readCodeMods = once(_readCodeMods);
const readRules = once(_readRules);

module.exports = (info = {}) => {
    const {
        rulesdir,
        name = '',
        options = {},
        getOptions = _getOptions,
    } = info;
    
    const [dir, customOptions] = getOptions(dirname(name));
    const homeOptions = readHomeOptions();
    const relativeName = relative(cwd, name);
    
    const defaultMatch = parseMatch(relativeName, defaultOptions.match);
    const mergedOptions = merge(
        options,
        defaultOptions,
        homeOptions,
        defaultMatch,
        customOptions,
    );
    
    const customMatch = parseMatch(relativeName, customOptions.match);
    const resultOptions = merge(
        readCodeMods(),
        readRules(dir, rulesdir),
        mergedOptions,
        customMatch,
    );
    
    return {
        ...resultOptions,
        dir,
    };
};

function _getOptions(cwd) {
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

function _readRules(dirOpt, rulesDir) {
    if (!rulesDir)
        return {};
    
    const dir = join(dirOpt, rulesDir);
    const [e, names] = tryCatch(readdirSync, dir);
    
    if (e)
        return {};
    
    const plugins = [];
    
    for (const name of names) {
        const full = join(dir, name);
        const plugin = require(full);
        const shortName = name.replace('putout-plugin-');
        
        plugins.push({
            [shortName]: plugin,
        });
    }
    
    return {
        plugins,
    };
}

function _readHomeOptions() {
    const name = join(home, '.putout.json');
    const [, data = {}] = tryCatch(require, name);
    
    return data;
}

function _readCodeMods() {
    const dir = join(home, '.putout');
    const [e, names] = tryCatch(readdirSync, dir);
    
    if (e)
        return {};
    
    const plugins = [];
    
    for (const name of names) {
        const full = join(dir, name);
        const plugin = require(full);
        const shortName = name.replace('putout-plugin-');
        
        plugins.push({
            [shortName]: plugin,
        });
    }
    
    return {
        plugins,
    };
}
