import {loadESLint} from 'eslint';
import {findUp} from 'find-up';

export const getESLint = async ({name, fix, config, overrideConfigFile, loadESLintOverride, find = findUp}) => {
    const eslint = await chooseESLint({
        fix,
        name,
        config,
        overrideConfigFile,
        loadESLintOverride,
        find,
    });
    
    return {
        calculateConfigForFile: eslint.calculateConfigForFile.bind(eslint),
        lintText: eslint.lintText.bind(eslint),
    };
};

async function chooseESLint({name, config, fix, overrideConfigFile, loadESLintOverride, find}) {
    const flatConfigPath = await find('eslint.config.js');
    
    if (flatConfigPath)
        return await getFlatESLint({
            loadESLintOverride,
            name,
            config,
            overrideConfigFile: overrideConfigFile || flatConfigPath,
            fix,
        });
    
    return await getOldESLint({
        name,
        config,
        loadESLintOverride,
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
