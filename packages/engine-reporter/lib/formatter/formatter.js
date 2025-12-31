import {simpleImport as _simpleImport} from 'putout/simple-import';
import {createAsyncLoader as _createAsyncLoader} from '@putout/engine-loader';
import {tryToCatch} from 'try-to-catch';
import {
    NO_FORMATTER,
    CANNOT_LOAD_FORMATTER,
} from 'putout/exit-codes';

const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a, {}];

export const getFormatter = async (formatterOptional, exit, overrides = {}) => {
    const {
        createAsyncLoader = _createAsyncLoader,
        simpleImport = _simpleImport,
    } = overrides;
    
    const [formatterName = 'none', formatterOptions] = maybeArray(formatterOptional);
    const loadFormatter = createAsyncLoader('formatter', {
        simpleImport,
    });
    
    const [error, formatter] = await tryToCatch(loadFormatter, formatterName);
    
    if (formatter)
        return [formatter, formatterOptions];
    
    if (error.code === 'ERR_MODULE_NOT_FOUND')
        return exit(NO_FORMATTER, error);
    
    exit(CANNOT_LOAD_FORMATTER, error);
};
