'use strict';

const regexpTree = require('regexp-tree');

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
    },
});

