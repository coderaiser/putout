'use strict';

const {
    values,
    entries,
    assign,
} = Object;

const toArray = (a) => Array.from(a);

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
    get(map) {
        return values(map);
    },
    set(map, name, data) {
        map[name] = data;
    },
});

module.exports.upStore = createStore({
    get(map) {
        return values(map);
    },
    set(map, name, data) {
        map[name] = map[name] || {};
        assign(map[name], data);
    },
});

module.exports.upListStore = createStore({
    get(map) {
        return values(map).map(toArray);
    },
    set(map, name, data) {
        map[name] = map[name] || new Set();
        map[name].add(data);
    },
});

function createStore({set, get}) {
    return (map = {}) => {
        const fn = (...args) => {
            if (!args.length)
                return get(map);
            
            const [name, data] = args;
            
            if (args.length === 1)
                return map[name];
            
            set(map, name, data);
        };
        
        fn.clear = () => {
            map = {};
        };
        
        fn.entries = () => entries(map);
        
        return fn;
    };
}

