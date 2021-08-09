import {join} from 'path';
import {
    readFile,
    writeFile,
} from 'fs/promises';

import tryCatch from 'try-catch';
import tryToCatch from 'try-to-catch';

import matchErrors, {
    READ_ERROR,
    PARSE_ERROR,
    NO_RULES,
    WRITE_ERROR,
    SUCCESS,
} from './codes.js';

const {
    parse,
    stringify,
} = JSON;

const superStringify = (a) => `${stringify(a, null, 4)}\n`;

export {
    matchErrors,
};

export const match = async ({name, cwd}) => {
    const configPath = join(cwd, '.putout.json');
    const [readError, data] = await tryToCatch(readFile, configPath, 'utf8');
    
    if (readError)
        return READ_ERROR;
    
    const [parseError, options] = tryCatch(parse, data);
    
    if (parseError)
        return PARSE_ERROR;
    
    if (!options.rules)
        return NO_RULES;
    
    const {rules} = options;
    
    options.match = {
        ...options.match,
        [name]: rules,
    };
    
    delete options.rules;
    
    const [writeError] = await tryToCatch(writeFile, configPath, superStringify(options));
    
    if (writeError)
        return WRITE_ERROR;
    
    return SUCCESS;
};

