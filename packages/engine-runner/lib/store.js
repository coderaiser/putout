'use strict';

const {
    values,
    entries,
    assign,
} = Object;

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

module.exports.mapStore = createStore({
    set(map, name, data) {
        map[name] = data;
    },
});

module.exports.upStore = createStore({
    set(map, name, data) {
        map[name] = map[name] || {};
        assign(map[name], data);
    },
});

function createStore({set}) {
    return (map = {}) => {
        const fn = (...args) => {
            if (!args.length)
                return values(map);
            
            const [name, data] = args;
            
            if (args.length === 1)
                return map[name];
            
            set(map, name, data);
        };
        
        fn.clear = () => {
            map = {};
        };
        
        fn.entries = () => {
            return entries(map);
        };
        
        return fn;
    };
}

