'use strict';

const {createAsyncLoader} = require('../load/async-loader');

const parseProcessorNames = require('../processors/parse-processor-names');

const {check} = require('../check');

module.exports.loadProcessorsAsync = async (options, load) => {
    check(options);
    
    const {processors = []} = options;
    const parsedProcessors = parseProcessorNames(processors);
    const loadProcessor = createAsyncLoader('processor');
    
    const list = [];
    
    for (const [name, fn] of parsedProcessors) {
        if (fn) {
            list.push(fn);
            continue;
        }
        
        list.push(loadProcessor(name, load));
    }
    
    return await Promise.all(list);
};
