import {operator} from 'putout';

const {
    traverseProperties,
    __json,
    setLiteralValue,
    remove,
} = operator;

export const createRenameProperty = (tuples) => ({
    report,
    fix,
    traverse: createTraverse(tuples),
});

const report = ({from, to}) => `Rename property: '${from}' -> '${to}'`;

const fix = ({path, to}) => {
    if (!to) {
        remove(path.parentPath.parentPath);
        return;
    }
    
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
