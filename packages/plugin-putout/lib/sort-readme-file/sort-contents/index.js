const {entries} = Object;

export const report = () => `Sort 'contents'`;

export const fix = ({path, list}) => {
    path.node.arguments = list;
};

export const traverse = ({listStore, push}) => ({
    'li("✅ ", link(__b, __c), ";")': (path) => {
        listStore(path);
    },
    'Program': {
        exit() {
            const list = {};
            const ids = {};
            
            for (const {node, parentPath} of listStore()) {
                const {line} = parentPath.node.loc.start;
                
                ids[line] = parentPath;
                
                list[line] = list[line] || [];
                list[line].push(node);
            }
            
            const sortedList = {};
            const resultList = [];
            
            for (const [ul, currentList] of entries(list)) {
                sortedList[ul] = currentList.toSorted(asc);
                
                for (const [i, current] of sortedList[ul].entries()) {
                    if (current !== currentList[i]) {
                        resultList[ul] = sortedList[ul];
                        break;
                    }
                }
            }
            
            for (const [id, list] of entries(resultList)) {
                push({
                    path: ids[id],
                    list,
                });
            }
        },
    },
});

function asc(a, b) {
    return getValue(a).charCodeAt(0) - getValue(b).charCodeAt(0);
}

function getValue(node) {
    return node.arguments[1].arguments[0].value;
}
