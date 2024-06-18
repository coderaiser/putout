import {dirname} from 'node:path';
import process from 'node:process';
import {loadESLint} from 'eslint';
import {findUp} from 'find-up';

const CWD = process.cwd();

export const getESLint = async ({name, fix, config, overrideConfigFile, loadESLintOverride, find = findUp, findFlat = find, findRC = find}) => {
    const cwd = dirname(name).replace(/^\./, CWD);
    const eslint = await chooseESLint({
        fix,
        cwd,
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

async function chooseESLint({cwd, config, fix, overrideConfigFile, loadESLintOverride, findFlat, findRC}) {
    const runESLint = await getESLintRunner({
        cwd,
        overrideConfigFile,
        findFlat,
        findRC,
    });
    
    return await runESLint({
        loadESLintOverride,
        cwd,
        config,
        overrideConfigFile,
        fix,
    });
}

async function getOldESLint({cwd, fix, config, overrideConfigFile, loadESLintOverride = loadESLint}) {
    const ESLint = await loadESLintOverride({
        useFlatConfig: false,
    });
    
    const eslint = new ESLint({
        cwd,
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

async function getFlatESLint({cwd, fix, config, overrideConfigFile, loadESLintOverride = loadESLint}) {
    const FlatESLint = await loadESLintOverride({
        useFlatConfig: true,
    });
    
    const eslint = new FlatESLint({
        cwd,
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

async function getESLintRunner({cwd, findFlat, findRC, overrideConfigFile}) {
    if (overrideConfigFile)
        return isFlat(overrideConfigFile) ? getFlatESLint : getOldESLint;
    
    const [rcConfig = '', flatConfig = ''] = await Promise.all([
        findRC(['.eslintrc.json', '.eslintrc.js'], {
            cwd,
        }),
        findFlat(['eslint.config.js', 'eslint.config.mjs', 'eslint.config.cjs'], {
            cwd,
        }),
    ]);
    
    const noConfigFound = !rcConfig && !flatConfig;
    const foundRConfig = rcConfig.length > flatConfig.length;
    
    if (noConfigFound || foundRConfig)
        return getOldESLint;
    
    return getFlatESLint;
}
