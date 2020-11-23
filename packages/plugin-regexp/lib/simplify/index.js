'use strict';

const {types} = require('putout');
const fullstore = require('fullstore');
const regexpTree = require('regexp-tree');

const fromStore = fullstore();
const toStore = fullstore();

//module.exports.report = () => `RegExp /${fromStore()}/ can be simplified to /${toStore()}/`;
module.exports.report = ({from, to}) => `RegExp ${from} can be simplified to ${to}`;

module.exports.fix = ({path, to}) => {
    path.node.extra.raw = to;
};

module.exports.traverse = ({push}) => ({
    RegExpLiteral(path) {
        const from = path.node.extra.raw;
        const to = regexpTree.optimize(from).toString();
        
        if (from !== to) {
            push({
                path,
                from,
                to,
            });
        }
    }
});

/*
module.exports.match = () => ({
    '/__a/': ({__a}) => {
        const pattern = `/${__a}/`;
        const result = regexpTree.optimize(pattern).toString().slice(1, -1);
        const is = result !== pattern;
        
        if (is) {
            fromStore(__a)
            toStore(result);
        }
        
        return is;
    },
});

module.exports.replace = () => ({
    '/__a/': ({__a}, path) => {
        path.node.extra.raw = `/${toStore()}/`;
        return path;
    },
});
*/
