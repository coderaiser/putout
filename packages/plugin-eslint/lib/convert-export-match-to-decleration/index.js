'use strict';

const {operator, template} = require('putout');
const {
    replaceWith,
    compare,
    insertAfter,
} = operator;

const MATCH = 'module.exports.match = __object';
const DEFAULT = 'module.exports = __a';

module.exports.report = () => `Export 'match' at end of file in CommonJS`;

const declareMatch = template('const match = %%match%%');
const exportMatch = template.ast('module.exports.match = match');

module.exports.fix = ({path, moduleExports}) => {
    const {right} = path.node;
    
    replaceWith(path, declareMatch({
        match: right,
    }));
    
    insertAfter(moduleExports, exportMatch);
};

module.exports.traverse = ({pathStore, push}) => ({
    [MATCH]: pathStore,
    [DEFAULT]: pathStore,
    Program: {
        exit() {
            const [a, b] = pathStore();
            
            if (!a || !b)
                return;
            
            if (compare(MATCH, a) && a.node.loc.start > b.node.loc.start)
                return;
            
            push({
                path: a,
                moduleExports: b,
            });
        },
    },
});
