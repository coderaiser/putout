import {createAsyncLoader} from '../load/async-loader.js';
import parseProcessorNames from '../processors/parse-processor-names.js';
import {check} from '../check/index.js';

export const loadProcessorsAsync = async (options, simpleImport) => {
    check(options);
    
    const {processors = []} = options;
    const parsedProcessors = parseProcessorNames(processors);
    
    const loadProcessor = createAsyncLoader('processor', {
        simpleImport,
    });
    
    const list = [];
    
    for (const [name, fn] of parsedProcessors) {
        if (fn) {
            list.push(fn);
            continue;
        }
        
        list.push(loadProcessor(name));
    }
    
    return await Promise.all(list);
};
