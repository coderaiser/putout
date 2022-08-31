import {ESLint} from 'eslint';
import FlatESLintExports from 'eslint/use-at-your-own-risk';
import {findUpSync} from 'find-up';

const {FlatESLint} = FlatESLintExports;

export const getESLint = ({name, fix, config, overrideConfigFile, ESLintOverride, find = findUpSync}) => {
    const eslint = chooseESLint({
        fix,
        name,
        config,
        overrideConfigFile,
        ESLintOverride,
        find,
    });
    
    return {
        calculateConfigForFile: eslint.calculateConfigForFile.bind(eslint),
        lintText: eslint.lintText.bind(eslint),
    };
};

function chooseESLint({name, config, fix, overrideConfigFile, ESLintOverride, find}) {
    const flatConfigPath = find('eslint.config.js');
    
    if (flatConfigPath)
        return getFlatESLint({
            ESLintOverride,
            name,
            config,
            overrideConfigFile: overrideConfigFile || flatConfigPath,
            fix,
        });
    
    return getOldESLint({
        name,
        config,
        ESLintOverride,
        overrideConfigFile,
        fix,
    });
}

function getOldESLint({fix, config, overrideConfigFile, ESLintOverride = ESLint}) {
    const eslint = new ESLintOverride({
        fix,
        overrideConfig: {
            ignorePatterns: [
                '!.*',
            ],
            ...config,
        },
        ...overrideConfigFile && {
            overrideConfigFile,
            useEslintrc: false,
        },
    });
    
    return eslint;
}

function getFlatESLint({fix, config, overrideConfigFile, ESLintOverride = FlatESLint}) {
    const eslint = new ESLintOverride({
        fix,
        overrideConfig: {
            ignores: [
                '!.*',
            ],
            ...config,
        },
        ...overrideConfigFile && {
            overrideConfigFile,
        },
    });
    
    return eslint;
}

