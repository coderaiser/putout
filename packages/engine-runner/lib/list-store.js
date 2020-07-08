'use strict';

module.exports = (list = []) => {
    const fn = (...args) => {
        if (!args.length)
            return list;
        
        const [a] = args;
        list.push(a);
        
        return list;
    };
    
    fn.clear = () => {
        const a = list;
        list = [];
        return a;
    };
    
    return fn;
};

