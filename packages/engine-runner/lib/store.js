'use strict';

const {
    values,
    entries,
    assign,
} = Object;
const isObject = (a) => typeof a === 'object';

module.exports.listStore = (list = []) => {
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

module.exports.mapStore = (map = {}) => {
    const fn = (...args) => {
        if (!args.length)
            return values(map);
        
        const [name, data] = args;
        
        if (args.length === 1)
            return map[name];
        
        if (isObject(data)) {
            map[name] = map[name] || {};
            assign(map[name], data);
            return;
        }
        
        map[name] = data;
    };
    
    fn.clear = () => {
        map = {};
    };
    
    fn.entries = () => {
        return entries(map);
    };
    
    return fn;
};

