import module from 'node:module';
import tryCatch from 'try-catch';
import {getFormatter} from '../lib/cli/formatter/formatter.js';
import getOptions from '../lib/cli/get-options.js';
import Report from '../lib/cli/report.js';
import {
    INTERACTIVE_CANCELED,
    INVALID_CONFIG,
} from '../lib/cli/exit-codes.mjs';

const {createRequire} = module;
const require = createRequire(import.meta.url);

const {formatter: defaultFormatter} = require('../putout.json');
const {dependencies} = require('../package.json');

const {keys} = Object;

export const createReport = async ({args, cwd, exit}) => {
    const {interactive, format} = args;
    
    const report = Report();
    const noConfig = !args.config;
    
    const [configError, config] = tryCatch(getOptions, {
        name: `${cwd()}/*`,
        noConfig,
    });
    
    if (configError)
        exit(INVALID_CONFIG, configError);
    
    const {formatter} = config;
    
    let newFormatter;
    
    if (interactive) {
        const {chooseFormatter} = await import('@putout/cli-choose-formatter');
        
        [newFormatter] = await chooseFormatter(defaultFormatter, keys(dependencies));
        
        if (!newFormatter)
            exit(INTERACTIVE_CANCELED);
    }
    
    const [currentFormat, formatterOptions] = await getFormatter(newFormatter || format || formatter, exit);
    
    return async (a) => {
        return await report(currentFormat, {
            ...a,
            formatterOptions,
        });
    };
};
