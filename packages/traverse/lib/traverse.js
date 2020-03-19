'use strict';

const babelTraverse = require('@babel/traverse').default;
const {
    compare,
    parseTemplate,
} = require('@putout/compare');

const {merge} = babelTraverse.visitors;
const {entries} = Object;

const isTemplate = (a) => /[(;={]/.test(a) || !/[A-Z]/.test(a);

module.exports.isTemplate = isTemplate;
module.exports.traverse = traverse;

function traverse(path, visitor) {
    const items = [];
    const {
        node = path,
    } = path;
    
    for (const [tmpl, fn] of entries(visitor)) {
        if (!isTemplate(tmpl)) {
            items.push({
                [tmpl]: fn,
            });
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
        noScope: true,
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

