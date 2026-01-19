import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {readESLintConfig as _readESLintConfig} from './read-eslint-config.js';

const isFn = (a) => typeof a === 'function';
const {assign, entries} = Object;

function magicJoin(cwd, path) {
    if (cwd.startsWith('file://'))
        return fileURLToPath(new URL(path, cwd));
    
    return join(cwd, path);
}

export async function matchToFlatDir(cwd, path, config, overrides = {}) {
    const {
        readESLintConfig = _readESLintConfig,
    } = overrides;
    
    const dir = magicJoin(cwd, path);
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
