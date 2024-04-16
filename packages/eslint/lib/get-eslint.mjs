import {dirname} from 'node:path';
import {loadESLint} from 'eslint';
import {findUp} from 'find-up';

export const getESLint = async ({name, fix, config, overrideConfigFile, loadESLintOverride, find = findUp, findFlat = find, findRC = find}) => {
    const eslint = await chooseESLint({
        fix,
        name,
        config,
        overrideConfigFile,
        loadESLintOverride,
        findFlat,
        findRC,
    });
    
    return {
        calculateConfigForFile: eslint.calculateConfigForFile.bind(eslint),
        lintText: eslint.lintText.bind(eslint),
    };
};

async function chooseESLint({name, config, fix, overrideConfigFile, loadESLintOverride, findFlat, findRC}) {
    const runESLint = await getESLintRunner(name, {
        overrideConfigFile,
        findFlat,
        findRC,
    });
    
    return await runESLint({
        loadESLintOverride,
        name,
        config,
        overrideConfigFile,
        fix,
    });
}

async function getOldESLint({fix, config, overrideConfigFile, loadESLintOverride = loadESLint}) {
    const ESLint = await loadESLintOverride({
        useFlatConfig: false,
    });
    
    const eslint = new ESLint({
        fix,
        overrideConfig: {
            ignorePatterns: ['!.*'],
            ...config,
        },
        ...overrideConfigFile && {
            overrideConfigFile,
            useEslintrc: false,
        },
    });
    
    return eslint;
}

async function getFlatESLint({fix, config, overrideConfigFile, loadESLintOverride = loadESLint}) {
    const FlatESLint = await loadESLintOverride({
        useFlatConfig: true,
    });
    
    const eslint = new FlatESLint({
        fix,
        overrideConfig: {
            ignores: ['!.*'],
            ...config,
        },
        ...overrideConfigFile && {
            overrideConfigFile,
        },
    });
    
    return eslint;
}

const isFlat = (a) => a?.includes('config');

async function getESLintRunner(name, {findFlat, findRC, overrideConfigFile}) {
    if (overrideConfigFile)
        return isFlat(overrideConfigFile) ? getFlatESLint : getOldESLint;
    
    const cwd = dirname(name);
    const [rcConfig = '', flatConfig = ''] = await Promise.all([
        findRC(['.eslintrc.json', '.eslintrc.js'], {
            cwd,
        }),
        findFlat(['eslint.config.js', 'eslint.config.mjs', 'eslint.config.cjs'], {
            cwd,
        }),
    ]);
    
    if (rcConfig.length > flatConfig.length)
        return getOldESLint;
    
    return getFlatESLint;
}
