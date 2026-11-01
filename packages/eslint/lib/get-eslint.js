import {dirname} from 'node:path';
import process from 'node:process';
import {tryCatch} from 'try-catch';
import {loadESLint} from 'eslint';

const isFn = (a) => typeof a === 'function';
const {isArray} = Array;
const {stringify} = JSON;
const maybeArray = (a) => isArray(a) ? a : [a];
const CWD = process.cwd();

const replacer = (key, value) => {
    if (isFn(value))
        throw Error('Function can not be serialized');
    
    return value;
};

const createKey = (options) => {
    const [error, key] = tryCatch(stringify, options, replacer);
    
    if (error)
        return null;
    
    return key;
};

const instancesOfLoaders = new WeakMap();

const getInstances = (loader) => {
    if (!instancesOfLoaders.has(loader))
        instancesOfLoaders.set(loader, new Map());
    
    return instancesOfLoaders.get(loader);
};

const createESLint = async ({cwd, fix, config, overrideConfigFile, loadESLintOverride}) => {
    const FlatESLint = await loadESLintOverride({
        useFlatConfig: true,
    });
    
    const eslint = new FlatESLint({
        cwd,
        fix,
        overrideConfig: [
            ...maybeArray(config), {
                ignores: ['!.*'],
            },
        ],
        ...overrideConfigFile && {
            overrideConfigFile,
        },
    });
    
    return {
        calculateConfigForFile: eslint.calculateConfigForFile.bind(eslint),
        lintText: eslint.lintText.bind(eslint),
    };
};

const createESLintForDirectoryOfFile = (options) => createESLint({
    ...options,
    cwd: dirname(options.name).replace(/^\./, CWD),
});

const createSharedESLint = (options) => createESLint({
    ...options,
    cwd: CWD,
});

export const getESLint = async ({name, fix, config = [], putout = false, overrideConfigFile, loadESLintOverride = loadESLint}) => {
    if (overrideConfigFile)
        return await createESLintForDirectoryOfFile({
            name,
            fix,
            config,
            overrideConfigFile,
            loadESLintOverride,
        });
    
    const instances = getInstances(loadESLintOverride);
    const key = createKey([fix, config, putout]);
    
    if (key !== null && instances.has(key))
        return instances.get(key);
    
    const eslint = await createSharedESLint({
        fix,
        config,
        loadESLintOverride,
    });
    
    if (key !== null)
        instances.set(key, eslint);
    
    return eslint;
};
