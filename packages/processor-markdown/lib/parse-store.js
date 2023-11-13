export const initParseStore = () => {
    let cache = null;
    let parse = null;
    
    const fn = function needContext(a) {
        parse.call(this, a);
        const {parser} = this;
        
        this.parser = function(...a) {
            if (cache)
                return cache;
            
            cache = parser(...a);
            
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
