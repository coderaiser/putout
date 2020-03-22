'use strict';

const babelTraverse = require('@babel/traverse').default;
const {
    compare,
    parseTemplate,
    isTemplate,
} = require('@putout/compare');

const {merge} = babelTraverse.visitors;
const {entries} = Object;

module.exports.traverse = traverse;

const getTemplate = ([a]) => a;
const isPath = (path) => Boolean(path.node);
const parsePath = (path) => isPath(path) ? path.node : path;

function traverse(path, visitor) {
    path = parsePath(path);
    const items = [];
    const noScope = !isPath(path);
    
    const parsedVisitors = entries(visitor);
    const withTemplates = parsedVisitors
        .map(getTemplate)
        .find(isTemplate);
    
    if (!withTemplates)
        return babelTraverse(path, {
            noScope,
            ...visitor,
        });
    
    for (const [tmpl, fn] of parsedVisitors) {
        if (!isTemplate(tmpl)) {
            items.push({
                [tmpl]: fn,
            });
            continue;
        }
        
        const [node, type] = parseTemplate(tmpl);
        const visit = getVisit({
            fn,
            node,
        });
        
        items.push({
            [type]: visit,
        });
    }
    
    babelTraverse(path, {
        noScope,
        ...merge(items),
    });
}

const getVisit = ({fn, node}) => (path) => {
    if (!compare(path, node)) {
        return;
    }
    
    fn(path);
};

module.exports.contains = (path, items) => {
    let found = false;
    
    const {
        node = path,
    } = path;
    
    const visit = (path) => {
        found = true;
        path.stop();
    };
    
    const visitors = {};
    
    for (const item of items) {
        visitors[item] = visit;
    }
    
    traverse(node, visitors);
    
    return found;
};

