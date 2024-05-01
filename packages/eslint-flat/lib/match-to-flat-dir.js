'use strict';

const process = require('node:process');
const {join} = require('node:path');
const {readESLintConfig: _readESLintConfig} = require('./read-eslint-config');
const isFn = (a) => typeof a === 'function';
const {assign, entries} = Object;
const CWD = process.cwd();

module.exports.matchToFlatDir = matchToFlatDir;

async function matchToFlatDir(path, config, {
    readESLintConfig = _readESLintConfig,
} = {}) {
    const dir = join(CWD, path);
    const flatConfig = config || await readESLintConfig(dir);
    const {match} = flatConfig;
    
    if (match)
        return parseMatch(path, match);
    
    return parseFlatConfig(path, flatConfig);
}

function parseFlatConfig(path, flatConfig) {
    const result = [];
    
    for (const currentConfig of flatConfig) {
        const {files, ignores: ignoresRaw = []} = currentConfig;
        const ignores = ignoresRaw.map(parseIgnores(path));
        
        maybeAssignIgnores(currentConfig, ignores);
        
        if (!files) {
            result.push({
                files: [join('**/', path)],
                ...currentConfig,
            });
            continue;
        }
        
        const [name] = files;
        
        if (isFn(name)) {
            result.push(currentConfig);
            continue;
        }
        
        result.push({
            ...currentConfig,
            files: ['**/' + join(path, name)],
        });
    }
    
    return result;
}

const parseIgnores = (path) => (name) => {
    if (isFn(name))
        return name;
    
    return '**/' + join(path, name);
};

const maybeAssignIgnores = (config, ignores) => {
    if (!ignores.length)
        return;
    
    assign(config, {
        ignores,
    });
};

function parseMatch(path, match) {
    const result = [];
    
    for (const [name, rules] of entries(match)) {
        result.push({
            files: ['**/' + join(path, name)],
            rules,
        });
    }
    
    return result;
}
