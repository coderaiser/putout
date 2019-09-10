'use strict';

const template = require('@babel/template').default;
const compare = require('./compare');

const isTemplate = (a) => /[(;={]/.test(a) || !/[A-Z]/.test(a);

const generate = templater();

const generateNode = ({exclude}) => {
    if (!exclude)
        return null;
    
    if (!isTemplate(exclude))
        return exclude;
    
    return generate(exclude);
};

const exclude = ({tmpl, fn, nodeExclude}) => {
    if (!nodeExclude)
        return {
            [tmpl]: fn,
        };
    
    const visit = wrapWithCheck({
        fn,
        nodeExclude,
    });
    
    return {
        [tmpl]: visit,
    };
};

module.exports = (visitor, options) => {
    const parsed = [];
    const entries = Object.entries(visitor);
    const nodeExclude = generateNode(options);
    
    for (const [tmpl, fn] of entries) {
        if (!isTemplate(tmpl)) {
            parsed.push(exclude({
                tmpl,
                fn,
                nodeExclude,
            }));
            continue;
        }
        
        const nodeInclude = generate(tmpl);
        const {type} = nodeInclude;
        
        const visit = wrapWithCheck({
            nodeInclude,
            nodeExclude,
            fn,
        });
        
        parsed.push({
            [type]: visit,
        });
    }
    
    return parsed;
};

function wrapWithCheck({nodeInclude, nodeExclude, fn}) {
    return (path) => {
        if (nodeExclude && compare(path, nodeExclude, path.node))
            return path.skip();
        
        if (nodeInclude && !compare(path, nodeInclude, path.node))
            return;
        
        fn(path);
    };
}

function templater() {
    const cache = {};
    
    return (value) => {
        if (cache[value])
            return cache[value];
        
        const result = template.ast(value);
        cache[value] = result.expression || result;
        
        return cache[value];
    };
}

