import {__json} from '@putout/operator-json';
import {
    traverseProperties,
    setLiteralValue,
    remove,
} from '@putout/operate';

export const renameProperties = (tuples) => ({
    report,
    fix,
    traverse: createTraverse(tuples),
});

const report = ({from, to}) => `Rename property: '${from}' -> '${to}'`;

const fix = ({path, to}) => {
    if (!to) {
        remove(path);
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
