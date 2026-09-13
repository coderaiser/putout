import {traverseProperties} from '@putout/operate';
import {__json} from '@putout/operator-json';

export const sortProperties = (name) => ({
    report,
    fix,
    traverse: createTraverse(name),
});

const report = ({name}) => `Sort '${name}'`;

const fix = ({sortedPath}) => {
    sortedPath.node.value.properties.sort(ascProperties);
};

const createTraverse = (name) => ({push}) => ({
    [__json]: (path) => {
        const [sortedPath] = traverseProperties(path, 'rules');
        const names = sortedPath.node.value.properties.map(getName);
        const sortedNames = names.toSorted(asc);
        
        if (compareArrays(names, sortedNames))
            return;
        
        push({
            name,
            path,
            sortedPath,
        });
    },
});

const getName = (a) => a.key.value;

const asc = (a, b) => a.localeCompare(b);

const ascProperties = (a, b) => {
    return asc(a.key.value, b.key.value);
};

function compareArrays(a, b) {
    for (const [i, name] of a.entries()) {
        if (name !== b[i])
            return false;
    }
    
    return true;
}
