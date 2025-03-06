'use strict';

const {types, operator} = require('putout');
const {replaceWith} = operator;
const {
    isBlockStatement,
    isVariableDeclaration,
    blockStatement,
} = types;

module.exports.report = () => `Use consistent blocks`;

module.exports.fix = (path) => {
    const paths = getAllNodes(path);
    
    if (isAllBlocks(paths))
        for (const path of paths) {
            if (isBlockStatement(path))
                continue;
            
            const {node} = path;
            replaceWith(path, blockStatement([node]));
        }
    else
        for (const path of paths) {
            if (!isBlockStatement(path))
                continue;
            
            const [node] = path.node.body;
            replaceWith(path, node);
        }
};

function isAllBlocks(paths) {
    const counts = [];
    
    for (const path of paths) {
        const is = isBlockStatement(path);
        
        if (is)
            counts.push(path.node.body.length);
        else
            counts.push(Infinity);
    }
    
    for (const count of counts) {
        if (count !== 1 && count !== Infinity)
            return true;
    }
    
    return false;
}

module.exports.include = () => [
    'IfStatement',
];

module.exports.filter = (path) => {
    const {consequent, alternate} = path.node;
    
    if (!alternate && !consequent.body?.length)
        return false;
    
    if (path === path.parentPath.get('alternate'))
        return false;
    
    const paths = getAllNodes(path);
    const blocks = [];
    
    for (const path of paths) {
        const is = isBlockStatement(path);
        const {body} = path.node;
        
        if (is && body.length === 1) {
            const [first] = body;
            
            if (isVariableDeclaration(first))
                continue;
        }
        
        blocks.push(is);
    }
    
    const count = blocks.filter(Boolean).length;
    
    if (!count)
        return false;
    
    const couple = [];
    
    for (const path of paths) {
        const is = isBlockStatement(path) && path.node.body.length > 1;
        couple.push(is);
    }
    
    const coupleCount = couple.filter(Boolean).length;
    
    if (!coupleCount)
        return true;
    
    if (coupleCount === paths.length)
        return false;
    
    return count === 1 || count !== paths.length;
};

function getAllNodes(path, nodes = []) {
    const consequent = path.get('consequent');
    nodes.push(consequent);
    
    if (!path.node.alternate)
        return nodes;
    
    const alternate = path.get('alternate');
    
    if (!alternate.isIfStatement())
        return [
            ...nodes,
            alternate,
        ];
    
    return getAllNodes(alternate, nodes);
}
