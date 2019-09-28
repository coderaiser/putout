'use strict';

const babelGenerate = require('@babel/generator').default;

const {
    compareAny,
    compareAll,
    generate,
} = require('./compare');

const {isArray} = Array;
const isTemplate = (a) => {
    if (a === 'enter')
        return false;
    
    return /[(;={]/.test(a) || !/[A-Z]/.test(a);
};
const toArray = (a) => isArray(a) ? a : [a];
const debug = require('debug')('putout:template');
const generateCode = (a) => babelGenerate(a).code;

const log = (a) => {
    if (!debug.enabled)
        return;
    
    debug(generateCode(a));
};

const generateNode = (list) => {
    if (!list)
        return [];
    
    return toArray(list).map(generate);
};

const exclude = ({tmpl, fn, nodesExclude}) => {
    if (!nodesExclude.length)
        return {
            [tmpl]: fn,
        };
    
    const visit = wrapWithCheck({
        fn,
        nodesExclude,
        nodesInclude: [],
    });
    
    return {
        [tmpl]: visit,
    };
};

module.exports = (visitor, options) => {
    const parsed = [];
    const entries = Object.entries(visitor);
    const nodesExclude = generateNode(options.exclude);
    const nodesInclude = generateNode(options.include);
    
    for (const [tmpl, fn] of entries) {
        if (!isTemplate(tmpl)) {
            parsed.push(exclude({
                tmpl,
                fn,
                nodesExclude,
                nodesInclude,
            }));
            continue;
        }
        
        const node = generate(tmpl);
        const {type} = node;
        
        const visit = wrapWithCheck({
            fn,
            nodesExclude,
            nodesInclude: [
                node,
                ...nodesInclude,
            ],
        });
        
        parsed.push({
            [type]: visit,
        });
    }
    
    return parsed;
};

function wrapWithCheck({nodesInclude, nodesExclude, fn}) {
    return (path) => {
        log(path.node);
        
        if (nodesExclude.length && compareAny(path, nodesExclude, path.node))
            return path.skip();
        
        if (nodesInclude.length && !compareAll(path, nodesInclude, path.node))
            return;
        
        fn(path);
    };
}

