import module from 'node:module';
import {tryCatch} from 'try-catch';
import _getOptions from 'putout/cli/get-options';
import {
    INTERACTIVE_CANCELED,
    INVALID_CONFIG,
} from 'putout/exit-codes';
import {getFormatter as _getFormatter} from './formatter/formatter.js';
import {initReport} from './report.js';

const {createRequire} = module;
const require = createRequire(import.meta.url);
const {formatter: defaultFormatter} = require('putout/putout.json');
const {dependencies} = require('putout/package.json');

const {keys} = Object;

export const createReport = async (overrides = {}) => {
    const {
        args,
        cwd,
        exit,
        getOptions = _getOptions,
        cliChooseFormatter = '@putout/cli-choose-formatter',
        getFormatter = _getFormatter,
    } = overrides;
    
    const {interactive, format} = args;
    
    const report = initReport();
    const noConfig = !args.config;
    
    const [configError, config] = tryCatch(getOptions, {
        name: `${cwd()}/*`,
        noConfig,
    });
    
    if (configError)
        return exit(INVALID_CONFIG, configError);
    
    const {formatter} = config;
    
    let newFormatter;
    
    if (interactive) {
        const {chooseFormatter} = await import(cliChooseFormatter);
        
        [newFormatter] = await chooseFormatter(defaultFormatter, keys(dependencies));
        
        if (!newFormatter)
            return exit(INTERACTIVE_CANCELED);
    }
    
    const [currentFormat, formatterOptions] = await getFormatter(newFormatter || format || formatter, exit);
    
    return async (a) => {
        return await report(currentFormat, {
            ...a,
            formatterOptions,
        });
    };
};
