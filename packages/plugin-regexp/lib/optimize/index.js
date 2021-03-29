'use strict';

const regexpTree = require('regexp-tree');

const START_SLASH = 1;
const END_SLASH = 1;
const addSlashes = (a) => START_SLASH + a + END_SLASH;

const whitelist = [];
const blacklist = [
    'charEscapeUnescape',
];

const options = {
    blacklist,
};

module.exports.report = ({from, to}) => `RegExp ${from} can be optimized to ${to}`;

module.exports.fix = ({path, to}) => {
    const {flags} = path.node;
    path.node.extra.raw = `${to}${flags}`;
    path.node.pattern = to.slice(1, -1);
};

module.exports.traverse = ({push}) => ({
    RegExpLiteral(path) {
        const from = path.node.pattern;
        const to = regexpTree.optimize(RegExp(from), whitelist, options).toString();
        
        if (from !== to && addSlashes(from.length) !== to.length) {
            push({
                path,
                from: `/${from}/`,
                to,
            });
        }
    },
});

