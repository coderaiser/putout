import {ESLint} from 'eslint';

export const getESLint = ({fix, config, overrideConfigFile, ESLintOverride = ESLint}) => {
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
    
    return {
        calculateConfigForFile: eslint.calculateConfigForFile.bind(eslint),
        lintText: eslint.lintText.bind(eslint),
    };
};

