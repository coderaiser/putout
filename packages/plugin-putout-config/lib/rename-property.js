'use strict';

const {operator} = require('putout');
const {
    traverseProperties,
    __json,
    setLiteralValue,
} = operator;

module.exports.createRenameProperty = (tuples) => ({
    report,
    fix,
    traverse: createTraverse(tuples),
});

const report = ({from, to}) => `Rename property: '${from}' -> '${to}'`;

const fix = ({path, to}) => {
    setLiteralValue(path.node.key, to);
};

const createTraverse = (tuples) => ({push}) => ({
    [__json](mainPath) {
        for (const [from, to] of tuples) {
            for (const path of traverseProperties(mainPath, from)) {
                push({
                    path,
                    from,
                    to,
                });
            }
        }
    },
});
