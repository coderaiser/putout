import {types} from 'putout';

const {isVariableDeclarator} = types;

export const report = () => `Add '\\n' after montag`;

export const match = () => ({
    'montag`__a`': ({__a}) => {
        const {raw} = __a.value;
        
        if (raw.startsWith(' '))
            return false;
        
        return !__a.value.raw.startsWith('\n');
    },
});

export const replace = () => ({
    'montag`__a`': ({__a}, path) => {
        const {raw} = __a.value;
        const column = getColumn(path);
        
        if (raw.includes('\n'))
            __a.value.raw = createMultilineValue({
                raw,
                column,
            });
        else
            __a.value.raw = createOnelineValue({
                raw,
                column,
            });
        
        return path;
    },
});

function createOnelineValue({raw, column}) {
    const indentAfter = Array(column).join(' ');
    const indentBefore = Array(column + 4).join(' ');
    
    return `\n${indentBefore}${raw}\n${indentAfter}`;
}

function createMultilineValue({raw, column}) {
    const rawLines = raw.split('\n');
    const indentAfter = Array(column).join(' ');
    const indentBefore = Array(column).join(' ');
    const count = rawLines.length - 1;
    const lines = [];
    
    for (const [index, line] of rawLines.entries()) {
        if (index === count)
            break;
        
        lines.push(`${indentBefore} ${line}`);
    }
    
    return `\n    ${lines.join('\n')}\n ${indentAfter}`;
}

function getColumn(path) {
    if (isVariableDeclarator(path.parentPath))
        return path.parentPath.parentPath.node.loc.start.column;
    
    return path.node.loc.start.column;
}
