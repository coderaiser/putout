'use strict';

const template = require('@babel/template').default;
const babelGenerate = require('@babel/generator').default;
const {
    compare,
    compareAny,
} = require('./compare');

const {isArray} = Array;
const isTemplate = (a) => /[(;={]/.test(a) || !/[A-Z]/.test(a);
const toArray = (a) => isArray(a) ? a : [a];
const debug = require('debug')('putout:template');
const log = () => {
    if (!debug.enabled)
        return;
};

const generateCode = (a) => babelGenerate(a).code;

const generate = templater();

const generateNode = ({exclude}) => {
    if (!exclude)
        return null;
    
    return toArray(exclude).map(generate);
};

const exclude = ({tmpl, fn, nodesExclude}) => {
    if (!nodesExclude)
        return {
            [tmpl]: fn,
        };
    
    const visit = wrapWithCheck({
        fn,
        nodesExclude,
    });
    
    return {
        [tmpl]: visit,
    };
};

module.exports = (visitor, options) => {
    const parsed = [];
    const entries = Object.entries(visitor);
    const nodesExclude = generateNode(options);
    
    for (const [tmpl, fn] of entries) {
        if (!isTemplate(tmpl)) {
            parsed.push(exclude({
                tmpl,
                fn,
                nodesExclude,
            }));
            continue;
        }
        
        const nodeInclude = generate(tmpl);
        const {type} = nodeInclude;
        
        const visit = wrapWithCheck({
            nodeInclude,
            nodesExclude,
            fn,
        });
        
        parsed.push({
            [type]: visit,
        });
    }
    
    return parsed;
};

function wrapWithCheck({nodeInclude, nodesExclude, fn}) {
    return (path) => {
        log(generateCode, path.node);
        
        if (nodesExclude && compareAny(path, nodesExclude, path.node))
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

