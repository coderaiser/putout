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

const isNoScope = (path) => !path.node;

function traverse(path, visitor) {
    const items = [];
    const noScope = isNoScope(path);
    const {
        node = path,
    } = path;
    
    const parsedVisitors = entries(visitor);
    const withTemplates = parsedVisitors
        .map(getTemplate)
        .find(isTemplate);
    
    if (!withTemplates)
        return babelTraverse(node, {
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
    
    babelTraverse(node, {
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

