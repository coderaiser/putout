'use strict';

module.exports.initParseStore = () => {
    let cache = null;
    let parse = null;
    
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
    
    fn.init = async () => {
        cache = null;
        ({default: parse} = await import('remark-parse'));
    };
    
    fn.clear = async () => {
        cache = null;
    };
    
    return fn;
};

