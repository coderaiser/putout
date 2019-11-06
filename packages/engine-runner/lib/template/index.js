'use strict';

const babelGenerate = require('@babel/generator').default;

const {
    compareAny,
    compareAll,
} = require('@putout/compare');

const isTemplate = (a) => {
    if (a === 'enter')
        return false;
    
    return /[(;={]/.test(a) || !/[A-Z]/.test(a);
};
const maybeArray = require('../maybe-array');
const debug = require('debug')('putout:template');
const {template} = require('@putout/engine-parser');
const generateCode = (a) => babelGenerate(a).code;

const log = (rule, a) => {
    if (!debug.enabled)
        return;
    
    debug(rule, generateCode(a));
};

const exclude = ({rule, tmpl, fn, nodesExclude}) => {
    if (!nodesExclude.length)
        return {
            [tmpl]: fn,
        };
    
    const visit = wrapWithCheck({
        rule,
        fn,
        nodesExclude,
        nodesInclude: [],
    });
    
    return {
        [tmpl]: visit,
    };
};

const parseType = (tmpl) => {
    const node = template.ast(tmpl);
    
    if (tmpl === '__object')
        return [node, 'ObjectPattern|ObjectExpression'];
    
    if (tmpl === '__array')
        return [node, 'ArrayPattern|ArrayExpression'];
    
    const {type} = node;
    
    return [node, type];
};

module.exports = ({rule, visitor, options}) => {
    const parsed = [];
    const entries = Object.entries(visitor);
    const nodesExclude = maybeArray(options.exclude);
    const nodesInclude = maybeArray(options.include);
    
    for (const [tmpl, fn] of entries) {
        if (!isTemplate(tmpl)) {
            parsed.push(exclude({
                rule,
                tmpl,
                fn,
                nodesExclude,
            }));
            continue;
        }
        
        const [node, type] = parseType(tmpl);
        const visit = wrapWithCheck({
            rule,
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

function wrapWithCheck({rule, nodesInclude, nodesExclude, fn}) {
    return (path) => {
        log(rule, path.node);
        
        if (nodesExclude.length && compareAny(path, nodesExclude))
            return path.skip();
        
        if (nodesInclude.length && !compareAll(path, nodesInclude))
            return;
        
        fn(path);
    };
}

