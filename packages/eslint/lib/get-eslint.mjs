import {dirname} from 'node:path';
import process from 'node:process';
import {loadESLint} from 'eslint';

const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];
const CWD = process.cwd();

export const getESLint = async ({name, fix, config = [], overrideConfigFile, loadESLintOverride = loadESLint}) => {
    const cwd = dirname(name).replace(/^\./, CWD);
    
    const FlatESLint = await loadESLintOverride({
        useFlatConfig: true,
    });
    
    const eslint = new FlatESLint({
        cwd,
        fix,
        overrideConfig: [
            ...maybeArray(config), {
                ignores: ['!.*'],
            }
            ,
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
