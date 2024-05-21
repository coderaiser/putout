'use strict';

const {operator, template} = require('putout');
const {
    replaceWith,
    insertAfter,
    compare,
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
    [MATCH]: storeIfWasNot({
        pathStore,
    }),
    [DEFAULT]: storeIfWasNot({
        pathStore,
    }),
    Program: {
        exit() {
            const [a, b] = pathStore();
            
            if (!a || !b)
                return;
            
            push({
                path: a,
                moduleExports: b,
            });
        },
    },
});

const storeIfWasNot = ({pathStore}) => (path) => {
    for (const current of pathStore()) {
        if (compare(current, DEFAULT))
            return;
    }
    
    pathStore(path);
};
