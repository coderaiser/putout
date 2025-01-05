'use strict';

const tryCatch = require('try-catch');

const {optimize} = require('regexp-tree');

const cutSlashes = (a) => a
    .split('/')
    .slice(1, -1)
    .join('/');

const whitelist = [];

const blacklist = [
    'charEscapeUnescape',
];

const options = {
    blacklist,
};

module.exports.report = ({pattern, to}) => `RegExp /${pattern}/ can be optimized to /${to}/`;

module.exports.fix = ({path, to, flags}) => {
    path.node.raw = `/${to}/${flags}`;
    path.node.pattern = to;
};

module.exports.traverse = ({push}) => ({
    RegExpLiteral(path) {
        const {pattern, flags} = path.node;
        
        const [error, result] = tryCatch(optimize, RegExp(pattern, flags), whitelist, options);
        
        if (error)
            return;
        
        const to = cutSlashes(result._string);
        
        if (pattern !== to && pattern.length !== to.length)
            push({
                path,
                flags,
                pattern,
                to,
            });
    },
});
