'use strict';

const {types, traverse: babelTraverse} = require('@putout/babel');

const {
    compare,
    parseTemplate,
    isTemplate,
    getTemplateValues,
} = require('@putout/compare');

const {isFile, isProgram} = types;
const {merge} = babelTraverse.visitors;
const {entries} = Object;

module.exports.traverse = traverse;

const isPath = (path) => Boolean(path.node);
const createTraverse = (path) => {
    if (isPath(path))
        return path.traverse.bind(path);
    
    const noScope = !isFile(path) && !isProgram(path);
    
    return (visitors) => {
        babelTraverse(path, {
            noScope,
            ...visitors,
        });
    };
};

const getTemplate = ([a]) => a;

function traverse(basePath, visitor) {
    const traverse = createTraverse(basePath);
    const items = [];
    const parsedVisitors = entries(visitor);
    
    const withTemplates = parsedVisitors
        .map(getTemplate)
        .find(isTemplate);
    
    if (!withTemplates)
        return traverse(visitor);
    
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
            tmpl,
        });
        
        items.push({
            [type]: visit,
        });
    }
    
    traverse(merge(items));
}

const getVisit = ({fn, node, tmpl}) => (path) => {
    if (!compare(path, node))
        return;
    
    fn(path, getTemplateValues(path.node, tmpl));
};

module.exports.contains = (path, items) => {
    let found = false;
    
    const visit = (path) => {
        found = true;
        path.stop();
    };
    
    const visitors = {};
    
    for (const item of items) {
        visitors[item] = visit;
    }
    
    traverse(path, visitors);
    
    return found;
};
