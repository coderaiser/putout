'use strict';

const {join} = require('node:path');
const {readFile: _readFile} = require('node:fs/promises');
const tryToCatch = require('try-to-catch');
const {FlatCompat} = require('@eslint/eslintrc');

const {parse} = JSON;
const _import = (a) => import(a);

module.exports.readESLintConfig = async (dirPath, {read = _import, readFile} = {}) => {
    const configNames = [
        'eslint.config.js',
        'eslint.config.cjs',
        'eslint.config.mjs',
    ];
    
    for (const configName of configNames) {
        const configPath = join(dirPath, configName);
        const [error, config] = await tryToCatch(read, configPath);
        
        if (!error)
            return config.default;
    }
    
    return await readRC(dirPath, {
        readFile,
    });
};

async function readRC(dirPath, {readFile = _readFile} = {}) {
    const configPath = join(dirPath, '.eslintrc.json');
    const [error, data] = await tryToCatch(readFile, configPath, 'utf8');
    
    if (error)
        return [];
    
    const config = parse(data);
    
    const compat = new FlatCompat({
        baseDirectory: dirPath,
        resolvePluginsRelativeTo: dirPath,
    });
    
    return compat.config(config);
}
