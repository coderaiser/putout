'use strict';

const {homedir} = require('os');
const {dirname, join} = require('path');
const {readdirSync} = require('fs');

const findUp = require('find-up');
const once = require('once');
const tryCatch = require('try-catch');

const merge = require('./merge');
const defaultOptions = require('../putout.json');

const readCodeMods = once(_readCodeMods);
const readRules = once(_readRules);

const cwd = process.cwd();

module.exports = ({rulesdir} = {}) => {
    const [dir, options] = getOptions(cwd);
    const resultOptions = merge(
        defaultOptions,
        readCodeMods(),
        readRules(dir, rulesdir),
        options,
    );
    
    return {
        ...resultOptions,
        dir,
    };
};

function getOptions(cwd) {
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

function _readCodeMods() {
    const dir = join(homedir(), '.putout');
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
