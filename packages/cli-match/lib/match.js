import {join} from 'node:path';
import {
    readFile as _readFile,
    writeFile as _writeFile,
} from 'node:fs/promises';
import tryCatch from 'try-catch';
import tryToCatch from 'try-to-catch';
import matchErrors, {
    NO_PATTERN,
    READ_ERROR,
    PARSE_ERROR,
    NO_RULES,
    WRITE_ERROR,
    SUCCESS,
} from './codes.js';

export * from './codes.js';

const {parse, stringify} = JSON;

const superStringify = (a) => `${stringify(a, null, 4)}\n`;

export {
    matchErrors,
};

export async function match({pattern, cwd, readFile = _readFile, writeFile = _writeFile}) {
    const code = await runMatch({
        pattern,
        cwd,
        readFile,
        writeFile,
    });
    
    return {
        code,
        message: matchErrors[code],
    };
}

export async function runMatch({pattern, cwd, readFile, writeFile}) {
    if (!pattern)
        return NO_PATTERN;
    
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
        [pattern]: {
            ...options.match?.[pattern],
            ...rules,
        },
    };
    
    delete options.rules;
    
    const [writeError] = await tryToCatch(writeFile, configPath, superStringify(options));
    
    if (writeError)
        return WRITE_ERROR;
    
    return SUCCESS;
}

