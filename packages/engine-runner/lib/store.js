'use strict';

const {
    values,
    entries,
    assign,
} = Object;

const toArray = (a) => Array.from(a);
const isNotRemoved = (a) => a.node;
const notRemoved = (a) => toArray(a).filter(isNotRemoved);
const id = (a) => a;

module.exports.listStore = createListStore();
module.exports.pathStore = createListStore(notRemoved);

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
        return values(map).map(notRemoved);
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

function createListStore(returns = id) {
    return (list = new Set()) => {
        const fn = (...args) => {
            if (!args.length)
                return returns(toArray(list));
            
            const [a] = args;
            list.add(a);
        };
        
        fn.clear = () => {
            const a = list;
            
            list = new Set();
            
            return returns(toArray(a));
        };
        
        return fn;
    };
}
