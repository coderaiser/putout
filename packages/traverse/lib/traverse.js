'use strict';

const traverse = require('@babel/traverse').default;
const {
    compare,
    parseTemplate,
} = require('@putout/compare');

const {merge} = traverse.visitors;
const {entries} = Object;

const isTemplate = (a) => /[(;={]/.test(a) || !/[A-Z]/.test(a);

module.exports.isTemplate = isTemplate;
module.exports.traverse = (path, visitor) => {
    const {
        node = path,
    } = path;
    const items = [];
    
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
    
    traverse(node, {
        noScope: true,
        ...merge(items),
    });
};

const getVisit = ({fn, node}) => (path) => {
    if (!compare(path, node)) {
        return;
    }
    
    fn(path);
};

