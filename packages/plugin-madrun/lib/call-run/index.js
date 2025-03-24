import {types} from 'putout';

const {
    isStringLiteral,
    stringLiteral,
    identifier,
    callExpression,
    arrayExpression,
} = types;

export const report = ({name}) => {
    return `"run" should be called in script: "${name}"`;
};

export const traverse = ({push}) => ({
    ArrowFunctionExpression(path) {
        const {body} = path.node;
        
        if (!isStringLiteral(body))
            return;
        
        const {value} = body;
        
        if (!/^(redrun|npm run)/.test(value))
            return;
        
        push({
            path,
            value,
            name: path.parent.key.value,
        });
    },
});

export const fix = ({path, value}) => {
    const [line, arg] = value.split(' -- ');
    const scripts = getScripts(line);
    
    const strs = [];
    
    for (const script of scripts) {
        strs.push(stringLiteral(script));
    }
    
    const runArgs = getRunArgs(strs, arg);
    
    path.node.body = callExpression(identifier('run'), runArgs);
};

function getRunArgs(strs, arg) {
    if (!arg)
        return [
            arrayExpression(strs),
        ];
    
    return [
        arrayExpression(strs),
        stringLiteral(arg),
    ];
}

function getScripts(line) {
    const scripts = line.split(' ');
    
    if (!line.indexOf('redrun'))
        return scripts.slice(1);
    
    return scripts.slice(2);
}
