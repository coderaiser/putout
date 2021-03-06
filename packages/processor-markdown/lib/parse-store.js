'use strict';

const parse = require('remark-parse');

module.exports.initParseStore = () => {
    let cache = null;
    
    const fn = function needContext(a) {
        parse.call(this, a);
        const {Parser} = this;
        
        this.Parser = function(...a) {
            if (cache) {
                return cache;
            }
            
            cache = Parser(...a);
            
            return cache;
        };
    };
    
    fn.init = () => {
        cache = null;
    };
    
    fn.clear = () => {
        cache = null;
    };
    
    return fn;
};

