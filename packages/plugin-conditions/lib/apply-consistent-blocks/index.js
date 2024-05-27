'use strict';

const {types, operator} = require('putout');
const {replaceWith} = operator;
const {
    isBlockStatement,
    BlockStatement,
} = types;

module.exports.report = () => `Use consistent blocks`;

module.exports.fix = (path) => {
    const paths = getAllNodes(path);
    
    if (isAllBlocks(paths))
        for (const path of paths) {
            if (isBlockStatement(path))
                continue;
            
            const {node} = path;
            replaceWith(path, BlockStatement([node]));
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
    if (path === path.parentPath.get('alternate'))
        return;
    
    const nodes = getAllNodes(path);
    const blocks = [];
    
    for (const node of nodes) {
        const is = isBlockStatement(node);
        blocks.push(is);
    }
    
    const count = blocks.filter(Boolean).length;
    
    if (!count)
        return false;
    
    const couple = [];
    
    for (const node of nodes) {
        const is = isBlockStatement(node) && node.node.body.length > 1;
        couple.push(is);
    }
    
    const coupleCount = couple.filter(Boolean).length;
    
    if (!coupleCount)
        return true;
    
    if (coupleCount === nodes.length)
        return false;
    
    return !(count !== 1 && count === nodes.length);
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
